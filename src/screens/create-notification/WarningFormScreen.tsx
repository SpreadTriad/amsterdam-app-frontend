import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../../components/features/form'
import {Box, SubmitButton, TextButton, Title} from '../../components/ui'
import {TextInput} from '../../components/ui/forms'
import {
  Column,
  Gutter,
  Row,
  ScrollView,
  Stretch,
} from '../../components/ui/layout'
import {NewWarning} from '../../types'
import {
  NotificationContext,
  NotificationStackParamList,
} from './CreateNotificationScreen'

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
  navigation: StackNavigationProp<NotificationStackParamList, 'WarningForm'>
}

export const WarningFormScreen = ({navigation}: Props) => {
  const notificationContext = useContext(NotificationContext)
  const {changeWarning, projectManagerSettings} = notificationContext

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

  const onSubmit = (data: FormData) => {
    if (projectManagerSettings?.id) {
      const warningData: NewWarning = {
        title: data.title,
        body: {
          preface: data.intro,
          content: data.message,
        },
        project_identifier: notificationContext.projectDetails.id!,
        project_manager_id: projectManagerSettings.id,
      }
      changeWarning(warningData)
      navigation.navigate('VerifyNotification')
    }
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(2)
    })
    return focusListener
  }, [navigation, notificationContext])

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountIntro(watchIntro?.length)
  }, [watchIntro])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  return (
    <ScrollView keyboardDismiss>
      <Stretch>
        <Box>
          <Column gutter="lg">
            <Title text="Schrijf een nieuwsartikel" />
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
                  charactersLeft={maxCharacters.title - characterCountTitle}
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
                      accessibilityLabel="Intro nieuwsartikel"
                      label="Intro nieuwsartikel"
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
                  charactersLeft={maxCharacters.intro - characterCountIntro}
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
                  charactersLeft={maxCharacters.message - characterCountMessage}
                />
              </Column>
              {errors.message && (
                <ValidationWarning warning="Type een nieuwsartikel" />
              )}
            </>
          </Column>
        </Box>
      </Stretch>
      <Box>
        <Row align="between" valign="center">
          <TextButton
            direction="backward"
            emphasis
            onPress={navigation.goBack}
            text="Vorige"
          />
          <SubmitButton onPress={handleSubmit(onSubmit)} text="Controleer" />
        </Row>
        <Gutter height="xl" />
      </Box>
    </ScrollView>
  )
}
