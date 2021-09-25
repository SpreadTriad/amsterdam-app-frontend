import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../App'
import {color} from '../../tokens'
import {NewNotification, NewWarning} from '../../types'
import {
  NotificationFormScreen,
  SelectNewsArticleScreen,
  WarningFormScreen,
} from '.'

export type PushNotificationStackParamList = {
  NotificationForm: undefined
  WarningForm: undefined
}

type PushNotificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'PushNotification'
>

type Props = {
  route: PushNotificationScreenRouteProp
}

type Context = {
  changeNotification: (newNotification: NewNotification) => void
  changeWarning: (newWarning: NewWarning) => void
  notification: NewNotification | undefined
  projectId: string | undefined
  warning: NewWarning | undefined
}

export const PushNotificationContext = createContext<Context>({
  changeNotification: () => {},
  changeWarning: () => {},
  projectId: undefined,
  notification: undefined,
  warning: undefined,
})

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.lighter,
  },
  headerShown: false,
}

export const CreateNotificationScreen = ({route}: Props) => {
  const [projectId, setProjectId] = useState<string>()
  const [notification, setNotification] = useState<NewNotification>()
  const [warning, setWarning] = useState<NewWarning>()

  const Stack = createStackNavigator()

  const changeNotification = (value: NewNotification) => setNotification(value)
  const changeWarning = (value: NewWarning) => setWarning(value)

  useEffect(() => {
    setProjectId(route.params.projectId)
  }, [route])

  return (
    <PushNotificationContext.Provider
      value={{
        changeNotification,
        changeWarning,
        notification,
        projectId,
        warning,
      }}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="SelectNewsArticle"
          component={SelectNewsArticleScreen}
        />
        <Stack.Screen
          name="NotificationForm"
          component={NotificationFormScreen}
        />
        <Stack.Screen name="WarningForm" component={WarningFormScreen} />
      </Stack.Navigator>
    </PushNotificationContext.Provider>
  )
}
