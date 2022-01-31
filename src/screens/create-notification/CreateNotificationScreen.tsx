import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {StackParams} from '../../app/navigation'
import {
  Box,
  KeyboardAvoidingView,
  PleaseWait,
  Stepper,
} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {useAsync, useAsyncStorage, useFetch} from '../../hooks'
import {color} from '../../tokens'
import {
  ArticleSummary,
  DraftNotification,
  NewWarning,
  ProjectManagerSettings,
  ResponseStatus,
} from '../../types'
import {
  NotificationFormScreen,
  NotificationResponseScreen,
  SelectNewsArticleScreen,
  VerifyNotificationScreen,
  WarningFormScreen,
} from './'

type Context = {
  articles?: ArticleSummary[]
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

type NewsDetails = {
  id: string
  title: string
}

export const NotificationContext = createContext<Context>({} as Context)

type NotificationScreenRouteProp = RouteProp<StackParams, 'Notification'>

export type NotificationStackParams = {
  NotificationForm: undefined
  NotificationResponse: undefined
  SelectNewsArticle: undefined
  VerifyNotification: undefined
  WarningForm: undefined
}

export type ProjectDetails = {
  id: string
  title: string
}

type Props = {
  route: NotificationScreenRouteProp
}

export const CreateNotificationScreen = ({route}: Props) => {
  const asyncStorage = useAsyncStorage()

  const [articles, setArticles] = useState<ArticleSummary[]>()
  const [articlesFetched, setArticlesFetched] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newsDetails, setNewsDetails] = useState<NewsDetails>()
  const [notification, setNotification] = useState<DraftNotification>()
  const [projectDetails, setProjectDetails] = useState({} as ProjectDetails)
  const [projectManagerSettings, setProjectManagerSettings] =
    useState<ProjectManagerSettings>()
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>()
  const [warning, setWarning] = useState<NewWarning>()

  const changeCurrentStep = (value: number) => setCurrentStep(value)
  const changeNewsDetails = (value: NewsDetails) => setNewsDetails(value)
  const changeNotification = (value: DraftNotification) =>
    setNotification(value)
  const changeResponseStatus = (value: ResponseStatus) =>
    setResponseStatus(value)
  const changeWarning = (value: NewWarning) => setWarning(value)

  const articlesApi = useFetch<ArticleSummary[]>({
    url: getEnvironment().apiUrl + '/articles',
    options: {
      params: {'project-ids': projectDetails.id},
    },
    onLoad: false,
  })

  useEffect(() => {
    const {id, title} = route.params.projectDetails
    setProjectDetails({
      id,
      title,
    })
  }, [route])

  useEffect(() => {
    projectDetails && articlesApi.fetchData()
  }, [projectDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (articlesApi.data) {
      setArticles(articlesApi.data)
      setArticlesFetched(true)
    }
  }, [articlesApi.data])

  useAsync(
    () => asyncStorage.getValue('project-manager'),
    setProjectManagerSettings,
  )

  if (!articlesFetched) {
    return <PleaseWait />
  }

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: color.background.white,
    },
    headerShown: false,
  }

  return (
    <NotificationContext.Provider
      value={{
        articles,
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
            component={NotificationFormScreen}
            name="NotificationForm"
          />
          <Stack.Screen
            component={SelectNewsArticleScreen}
            name="SelectNewsArticle"
          />
          <Stack.Screen name="WarningForm" component={WarningFormScreen} />
          <Stack.Screen
            component={VerifyNotificationScreen}
            name="VerifyNotification"
          />
          <Stack.Screen
            component={NotificationResponseScreen}
            name="NotificationResponse"
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
