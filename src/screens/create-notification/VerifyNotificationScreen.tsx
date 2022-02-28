import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {Image as ImageType} from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import HeroImage from '../../assets/images/project-warning-hero.svg'
import {
  Box,
  Image,
  PleaseWait,
  Preview,
  SingleSelectable,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {Column, Gutter, Row, ScrollView} from '../../components/ui/layout'
import {
  useAddNotificationMutation,
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
} from '../../services'
import {image as imageToken} from '../../tokens'
import {NotificationQueryArg} from '../../types'
import {
  selectMainImage,
  selectMainImageDescription,
  selectNewsArticle,
  selectNotification,
  selectProject,
  selectProjectWarning,
  setResponseStatus,
  setStep,
} from './notificationDraftSlice'
import {NotificationStackParams} from './'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'VerifyNotification'>
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const mainImage = useSelector(selectMainImage)
  const mainImageDescription = useSelector(selectMainImageDescription)
  const newsArticle = useSelector(selectNewsArticle)
  const notification = useSelector(selectNotification)
  const project = useSelector(selectProject)
  const projectWarning = useSelector(selectProjectWarning)
  const [isWarningSent, setWarningSent] = useState(false)

  const [
    addWarning,
    {
      data: addWarningData,
      isError: addWarningIsError,
      isLoading: addWarningIsLoading,
    },
  ] = useAddProjectWarningMutation()

  const [addProjectWarningImage, {isError: addProjectWarningImageIsError}] =
    useAddProjectWarningImageMutation()

  const [
    addNotification,
    {
      data: addNotificationData,
      error: addNotificationIsError,
      isLoading: addNotificationIsLoading,
    },
  ] = useAddNotificationMutation()

  const prepareImageToUpload = useCallback(
    (image: ImageType) => {
      const upload_body = {
        uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
        type: image.mime,
        name: image.filename || image.path.split('/').pop(),
      }
      let formData = new FormData()
      formData.append('main', true)
      formData.append('description', mainImageDescription)
      formData.append('data', upload_body)
      return formData
    },
    [mainImageDescription],
  )

  const sendWarningToBackend = async () => {
    if (projectWarning) {
      await addWarning(projectWarning)
      setWarningSent(true)
    }
  }

  const sendNotificationToBackend = useCallback(
    (
      articleIdentifier: Pick<
        NotificationQueryArg,
        'news_identifier' | 'warning_identifier'
      >,
    ) => {
      notification &&
        addNotification({
          ...notification,
          ...articleIdentifier,
        })
    },
    [addNotification, notification],
  )

  const handleSubmit = async () => {
    if (newsArticle?.id) {
      sendNotificationToBackend({news_identifier: newsArticle.id})
    }

    if (projectWarning) {
      await sendWarningToBackend()
    }
  }

  useEffect(() => {
    if (
      addWarningData &&
      isWarningSent &&
      mainImage &&
      mainImage !== 'placeholder'
    ) {
      addProjectWarningImage({
        project_warning_id: addWarningData.warning_identifier,
        image: prepareImageToUpload(mainImage),
      })
    }
  }, [
    addProjectWarningImage,
    addWarningData,
    isWarningSent,
    mainImage,
    prepareImageToUpload,
  ])

  useEffect(() => {
    if (addWarningData && isWarningSent) {
      sendNotificationToBackend({
        warning_identifier: addWarningData.warning_identifier,
      })
    }
  }, [addWarningData, isWarningSent, sendNotificationToBackend])

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(4))
    })
    return focusListener
  }, [dispatch, navigation])

  useEffect(() => {
    if (addNotificationData) {
      dispatch(setResponseStatus('success'))
      navigation.navigate('NotificationResponse')
    }
  }, [dispatch, navigation, addNotificationData])

  useEffect(() => {
    if (
      addNotificationIsError ||
      addProjectWarningImageIsError ||
      addWarningIsError
    ) {
      dispatch(setResponseStatus('failure'))
      navigation.navigate('NotificationResponse')
    }
  }, [
    addNotificationIsError,
    addProjectWarningImageIsError,
    addWarningIsError,
    dispatch,
    navigation,
  ])

  if (addWarningIsLoading || addNotificationIsLoading) {
    return <PleaseWait />
  }

  const image =
    mainImage === 'placeholder' ? (
      <View style={styles.placeholder}>
        <HeroImage />
      </View>
    ) : (
      <Image source={{uri: mainImage?.path}} />
    )

  return (
    <ScrollView grow>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Controleer" />
            <SingleSelectable>
              <Text>Project</Text>
              {project && <Title level={2} text={project.title} />}
            </SingleSelectable>
            {notification && (
              <>
                <Preview label="Pushbericht">
                  <Title level={2} text={notification.title} />
                  <Text>{notification.body}</Text>
                </Preview>
              </>
            )}
            {newsArticle && (
              <Preview label="Nieuwsartikel">
                <Text>{newsArticle.title}</Text>
              </Preview>
            )}
            {projectWarning && (
              <Preview image={image} label="Nieuwsartikel">
                <Title level={2} text={projectWarning.title} />
                <Text intro>{projectWarning.body.preface}</Text>
                <Text>{projectWarning.body.content}</Text>
              </Preview>
            )}
          </Column>
        </Box>
        <Box>
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              onPress={navigation.goBack}
              text="Vorige"
            />
            <SubmitButton onPress={handleSubmit} text="Verstuur" />
          </Row>
          <Gutter height="xl" />
        </Box>
      </Column>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    aspectRatio: imageToken.aspectRatio.wide,
  },
})
