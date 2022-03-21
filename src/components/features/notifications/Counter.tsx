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

  const styles = StyleSheet.create({
    counter: {
      justifyContent: 'center',
      alignItems: 'center',
      width: unreadNotifications && unreadNotifications > 99 ? 27 : 20,
      height: 20,
      borderRadius: 20 / 2,
      backgroundColor: color.background.invalid,
    },
  })

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
    if (notifications.length) {
      const unreadCount = notificationSettings?.readIds
        ? notifications.length - notificationSettings?.readIds.length
        : notifications.length
      setUnreadNotifications(unreadCount)
    }
  }, [notifications, notificationSettings?.readIds])

  if (!subscribedProjects.length) {
    return null
  }

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
