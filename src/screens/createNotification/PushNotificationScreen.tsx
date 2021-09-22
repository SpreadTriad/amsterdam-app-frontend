import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../App'
import {color} from '../../tokens'
import {NotificationForm} from './NotificationForm'

export type PushNotificationStackParamList = {
  NotificationForm: {projectId: string}
}

type PushNotificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'PushNotification'
>

type Props = {
  route: PushNotificationScreenRouteProp
}

type Context = {
  projectId: string | undefined
}

export const PushNotificationRouteContext = createContext<Context>({
  projectId: undefined,
})

const globalScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.lighter,
  },
  headerShown: false,
}

export const PushNotificationScreen = ({route}: Props) => {
  const [projectId, setProjectId] = useState<string>()
  const Stack = createStackNavigator()

  useEffect(() => {
    setProjectId(route.params.projectId)
  }, [route])
  return (
    <PushNotificationRouteContext.Provider value={{projectId}}>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="NotificationForm" component={NotificationForm} />
      </Stack.Navigator>
    </PushNotificationRouteContext.Provider>
  )
}
