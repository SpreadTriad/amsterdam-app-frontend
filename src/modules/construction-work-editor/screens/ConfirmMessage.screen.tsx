import {useLayoutEffect, useState} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Alert} from '@/components/ui/feedback/Alert'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Checkbox} from '@/components/ui/forms/Checkbox'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Image} from '@/components/ui/media/Image'
import {Link} from '@/components/ui/text/Link'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ProjectWarningFallbackImage} from '@/modules/construction-work/assets/images'
import {
  clearDraft,
  selectCurrentProjectId,
  selectMainImage,
  selectMainImageDescription,
  selectMessage,
  selectProject,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
} from '@/modules/construction-work-editor/services'
import {useAddNotificationMutation} from '@/services/notifications'
import {resetAlert, setAlert} from '@/store/slices/alert'
import {useTheme} from '@/themes/useTheme'

type Props = NavigationProps<ConstructionWorkEditorRouteName.confirmMessage>

export const ConfirmMessageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const [isPushNotificationChecked, setPushNotificationChecked] =
    useState(false)
  const currentProjectId = useSelector(selectCurrentProjectId)
  const message = useSelector(selectMessage(currentProjectId))
  const mainImage = useSelector(selectMainImage(currentProjectId))
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )
  const project = useSelector(selectProject(currentProjectId))

  const [addWarning, {isLoading: isLoadingAddProjectWarning}] =
    useAddProjectWarningMutation()
  const [addProjectWarningImage, {isLoading: isLoadingAddProjectWarningImage}] =
    useAddProjectWarningImageMutation()
  const [addNotification, {isLoading: isLoadingAddNotification}] =
    useAddNotificationMutation()

  const {media} = useTheme()

  useLayoutEffect(() => {
    project &&
      navigation.setOptions({
        headerTitle: project.title,
      })
  }, [navigation, project])

  const onSubmit = async () => {
    if (!message) {
      return
    }

    dispatch(resetAlert())

    try {
      const warningResponse = await addWarning(message).unwrap()

      if (mainImage?.data) {
        await addProjectWarningImage({
          project_warning_id: warningResponse.warning_identifier,
          image: {
            main: true,
            description: mainImageDescription ?? 'Vervangende afbeelding',
            data: mainImage.data,
          },
        }).unwrap()
      }

      if (
        !!isPushNotificationChecked &&
        !!project?.title &&
        !!project.id &&
        !!message.title
      ) {
        await addNotification({
          title: project.title,
          body: message.title,
          project_identifier: project.id,
          warning_identifier: warningResponse.warning_identifier,
        }).unwrap()
      }

      dispatch(clearDraft())

      navigation.navigate(ConstructionWorkEditorRouteName.authorizedProjects, {
        showSuccessfullySentMessageAlert: true,
      })
    } catch (error: unknown) {
      dispatch(
        setAlert({
          closeType: AlertCloseType.withoutButton,
          content: {
            title: 'Niet gelukt',
            text: 'Het bericht opslaan is niet gelukt. Probeer het nog eens.',
          },
          variant: AlertVariant.negative,
          withIcon: false,
        }),
      )
    }
  }

  const image = (
    <Column gutter="sm">
      {mainImage ? (
        <Image source={{uri: mainImage?.path}} />
      ) : (
        <FigureWithFacadesBackground
          height={media.figureHeight.md}
          Image={<ProjectWarningFallbackImage />}
          imageAspectRatio={media.aspectRatio.extraWide}
        />
      )}
      {!!mainImageDescription && <Paragraph>{mainImageDescription}</Paragraph>}
    </Column>
  )

  return (
    <Screen
      scroll
      stickyFooter={
        <>
          <Box>
            <Column gutter="md">
              <Button
                disabled={
                  isLoadingAddProjectWarning ||
                  isLoadingAddProjectWarningImage ||
                  isLoadingAddNotification
                }
                label="Plaats bericht"
                onPress={onSubmit}
                testID="ConstructionWorkEditorCreateMessageSubmitButton"
              />
              <Row
                align="between"
                valign="center">
                <Link
                  label="Vorige"
                  onPress={navigation.goBack}
                  testID="ConstructionWorkEditorCreateMessagePreviousButton"
                  variant="backward"
                />
              </Row>
            </Column>
          </Box>
        </>
      }
      stickyHeader={<Alert />}>
      <Box>
        <Column gutter="lg">
          <Column gutter="md">
            <Title text="Controleer" />
            {image}
          </Column>
          <Column gutter="sm">
            {!!message?.title && <Title text={message.title} />}
            {!!message?.body && <Paragraph>{message.body}</Paragraph>}
          </Column>
          {!!project?.title && !!message?.title && (
            <Column gutter="sm">
              <Checkbox
                accessibilityLabel="Wil je ook een pushbericht versturen?"
                label={<Phrase>Wil je ook een pushbericht versturen?</Phrase>}
                onValueChange={() =>
                  setPushNotificationChecked(!isPushNotificationChecked)
                }
                testID="ConstructionWorkEditorCreateMessageSendPushNotificationCheckbox"
                value={isPushNotificationChecked}
              />
              {!!isPushNotificationChecked && (
                <Column gutter="xs">
                  <Title
                    level="h5"
                    text={project.title}
                  />
                  <Phrase>{message.title}</Phrase>
                </Column>
              )}
            </Column>
          )}
        </Column>
      </Box>
    </Screen>
  )
}
