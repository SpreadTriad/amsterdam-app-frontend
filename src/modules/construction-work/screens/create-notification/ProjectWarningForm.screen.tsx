import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import ImageCropPicker from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Button,
  Label,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../../../components/ui'
import {
  CharactersLeftDisplay,
  TextInput,
  ValidationWarning,
} from '../../../../components/ui/forms'
import {Column, Row, ScrollView} from '../../../../components/ui/layout'
import {Icon} from '../../../../components/ui/media'
import {NewProjectWarning} from '../../../../types'
import {selectProjectManager} from '../../components/project-manager'
import {
  selectMainImage,
  selectProjectId,
  setMainImage,
  setMainImageDescription,
  setProjectWarning,
  setStep,
} from './notificationDraftSlice'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from './routes'
import {selectTheme} from '@/themes'

const maxCharacters = {
  title: 50,
  intro: 150,
  message: 500,
}

type FormData = {
  title: string
  intro: string
  message: string
}

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

export const ProjectWarningFormScreen = ({navigation}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)
  const tokens = {maxWidth: 1920, maxHeight: 1080}

  const {id: projectManagerId} = useSelector(selectProjectManager)
  const dispatch = useDispatch()
  const mainImage = useSelector(selectMainImage)
  const projectId = useSelector(selectProjectId)

  const [characterCountTitle, setCharacterCountTitle] = useState<number>(
    maxCharacters.title,
  )
  const [characterCountIntro, setCharacterCountIntro] = useState<number>(
    maxCharacters.intro,
  )
  const [characterCountMessage, setCharacterCountMessage] = useState<number>(
    maxCharacters.message,
  )

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()

  const watchTitle = watch('title')
  const watchIntro = watch('intro')
  const watchMessage = watch('message')

  const addProjectWarningToStore = (data: FormData) => {
    const warningData: NewProjectWarning = {
      title: data.title,
      body: {
        preface: data.intro,
        content: data.message,
      },
      project_identifier: projectId!,
      project_manager_id: projectManagerId,
    }
    dispatch(setProjectWarning(warningData))
  }

  const onSubmitForm = (data: FormData) => {
    addProjectWarningToStore(data)
    dispatch(setMainImageDescription('placeholder tekst'))
    navigation.navigate(CreateNotificationRouteName.verifyNotification)
  }

  const pickImage = (data: FormData) => {
    addProjectWarningToStore(data)
    ImageCropPicker.openPicker({
      cropperCancelText: 'Annuleren',
      cropperChooseText: 'Kiezen',
      cropping: true,
      height: tokens.maxHeight,
      includeBase64: true,
      mediaType: 'photo',
      width: tokens.maxWidth,
    }).then(image => {
      dispatch(setMainImage(image))
    })
  }

  useEffect(() => {
    mainImage &&
      navigation.navigate(CreateNotificationRouteName.verifyMainImage)
  }, [mainImage, navigation])

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(2))
    })
    return focusListener
  }, [dispatch, navigation])

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountIntro(watchIntro?.length)
  }, [watchIntro])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  if (!projectId || !projectManagerId) {
    return null
  }

  return (
    <ScrollView grow>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Schrijf een nieuwsartikel" />
            <Column gutter="sm">
              <Title level={4} text="Schrijftips voor een nieuwsartikel" />
              <Row align="start">
                <Button
                  onPress={() =>
                    navigation.navigate(
                      CreateNotificationRouteName.writingGuide,
                    )
                  }
                  text="Toon schrijftips"
                />
              </Row>
            </Column>
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Titel nieuwsartikel"
                      label="Titel nieuwsartikel"
                      maxLength={maxCharacters.title}
                      multiline={true}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.title}
                    />
                  )}
                  name="title"
                  defaultValue=""
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.title - (characterCountTitle || 0)
                  }
                />
              </Column>
              {errors.title && <ValidationWarning warning="Vul een titel in" />}
            </>
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Korte inleiding"
                      label="Korte inleiding"
                      maxLength={maxCharacters.intro}
                      multiline={true}
                      numberOfLines={3}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.intro}
                    />
                  )}
                  name="intro"
                  defaultValue=""
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.intro - (characterCountIntro || 0)
                  }
                />
              </Column>
              {errors.intro && <ValidationWarning warning="Type een intro" />}
            </>
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Tekst nieuwsartikel"
                      label="Tekst nieuwsartikel"
                      maxLength={maxCharacters.message}
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.message}
                    />
                  )}
                  name="message"
                  defaultValue=""
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.message - (characterCountMessage || 0)
                  }
                />
              </Column>
              {errors.message && (
                <ValidationWarning warning="Type een nieuwsartikel" />
              )}
            </>
            <Column gutter="xs">
              <Row valign="baseline">
                <Label isAccessible text="Foto toevoegen " />
                <Text>(niet verplicht)</Text>
              </Row>
              <Column gutter="md">
                <Text>
                  Je kunt een foto toevoegen bij dit artikel. Deze komt bovenaan
                  het artikel te staan. Wanneer je geen foto toevoegt dan
                  gebruiken we een standaard afbeelding.
                </Text>
                <Row align="start">
                  <Button
                    icon={
                      <Icon size={24}>
                        <Enlarge fill={color.pressable.default.background} />
                      </Icon>
                    }
                    onPress={handleSubmit(pickImage)}
                    text="Foto’s toevoegen"
                    variant="inverse"
                  />
                </Row>
              </Column>
            </Column>
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
            <SubmitButton
              onPress={handleSubmit(onSubmitForm)}
              text="Controleer"
            />
          </Row>
        </Box>
      </Column>
    </ScrollView>
  )
}
