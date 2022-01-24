import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {StackParams} from '../../app/navigation'
import {Box, KeyboardAvoidingView, Stepper} from '../../components/ui'
import {useAsync, useAsyncStorage} from '../../hooks'
import {color} from '../../tokens'
import {
  Article,
  DraftNotification,
  NewWarning,
  ProjectManagerSettings,
  ResponseStatus,
} from '../../types'
import {NotificationResponseScreen} from './NotificationResponseScreen'
import {VerifyNotificationScreen} from './VerifyNotificationScreen'
import {
  NotificationFormScreen,
  SelectNewsArticleScreen,
  WarningFormScreen,
} from './'

export type NotificationStackParams = {
  NotificationForm: undefined
  NotificationResponse: undefined
  SelectNewsArticle: undefined
  VerifyNotification: undefined
  WarningForm: undefined
}

type NotificationScreenRouteProp = RouteProp<StackParams, 'Notification'>

type Props = {
  route: NotificationScreenRouteProp
}

type Context = {
  changeCurrentStep: (value: number) => void
  changeNewsDetails: (value: NewsDetails) => void
  changeNotification: (newNotification: DraftNotification) => void
  changeResponseStatus: (value: ResponseStatus) => void
  changeWarning: (newWarning: NewWarning) => void
  newsDetails?: NewsDetails
  notification?: DraftNotification
  projectDetails: ProjectDetails
  projectManagerSettings?: ProjectManagerSettings
  responseStatus?: ResponseStatus
  warning?: NewWarning
}

export type ProjectDetails = {
  articles?: Article[]
  id: string
  title: string
}

type NewsDetails = {
  id: string
  title: string
}

export const NotificationContext = createContext<Context>({} as Context)

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.white,
  },
  headerShown: false,
}

export const CreateNotificationScreen = ({route}: Props) => {
  const asyncStorage = useAsyncStorage()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectDetails, setProjectDetails] = useState({} as ProjectDetails)
  const [newsDetails, setNewsDetails] = useState<NewsDetails>()
  const [notification, setNotification] = useState<DraftNotification>()
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>()
  const [warning, setWarning] = useState<NewWarning>()
  const [projectManagerSettings, setProjectManagerSettings] =
    useState<ProjectManagerSettings>()

  const Stack = createStackNavigator()

  const changeCurrentStep = (value: number) => setCurrentStep(value)
  const changeNotification = (value: DraftNotification) =>
    setNotification(value)
  const changeNewsDetails = (value: NewsDetails) => setNewsDetails(value)
  const changeResponseStatus = (value: ResponseStatus) =>
    setResponseStatus(value)
  const changeWarning = (value: NewWarning) => setWarning(value)

  useEffect(() => {
    const {articles, id, title} = route.params.projectDetails
    setProjectDetails({
      articles,
      id,
      title,
    })
  }, [route])

  useAsync(
    () => asyncStorage.getValue('project-manager'),
    setProjectManagerSettings,
  )

  return (
    <NotificationContext.Provider
      value={{
        changeCurrentStep,
        changeNewsDetails,
        changeNotification,
        changeResponseStatus,
        changeWarning,
        newsDetails,
        notification,
        projectDetails,
        projectManagerSettings,
        responseStatus,
        warning,
      }}>
      <KeyboardAvoidingView>
        {currentStep !== 0 && (
          <Box background="grey">
            <Stepper current={currentStep} length={3} />
          </Box>
        )}
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="NotificationForm"
            component={NotificationFormScreen}
          />
          <Stack.Screen
            name="SelectNewsArticle"
            component={SelectNewsArticleScreen}
          />
          <Stack.Screen name="WarningForm" component={WarningFormScreen} />
          <Stack.Screen
            name="VerifyNotification"
            component={VerifyNotificationScreen}
          />
          <Stack.Screen
            name="NotificationResponse"
            component={NotificationResponseScreen}
            options={{
              cardStyle: {
                backgroundColor: color.background.app,
              },
            }}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NotificationContext.Provider>
  )
}
