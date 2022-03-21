import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {SettingsContext} from '../../../providers'
import {useGetNotificationsQuery} from '../../../services'
import {color} from '../../../tokens'
import {Text} from '../../ui'
import {getSubscribedProjects} from '../settings'

export const NotificationsCounter = ({...props}) => {
  const {settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications
  const [unreadNotifications, setUnreadNotifications] = useState<
    number | undefined
  >()

  const subscribedProjects = getSubscribedProjects(
    notificationSettings?.projects,
  )

  const {data: notifications = []} = useGetNotificationsQuery(
    subscribedProjects.length
      ? {
          projectIds: subscribedProjects,
        }
      : skipToken,
  )

  useEffect(() => {
    const unreadCount = notificationSettings?.readIds
      ? notifications.length - notificationSettings?.readIds.length
      : notifications.length
    setUnreadNotifications(unreadCount)
  }, [notifications, notificationSettings?.readIds])

  return (
    <View style={[styles.counter, props.style]}>
      {unreadNotifications ? (
        <Text inverse>{unreadNotifications}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: color.background.invalid,
  },
})
