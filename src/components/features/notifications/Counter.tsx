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

  const getContainerWidth = () => {
    if (unreadNotifications && unreadNotifications > 99) {
      return 32
    }
    if (unreadNotifications && unreadNotifications > 9) {
      return 24
    }
    return 20
  }

  const styles = StyleSheet.create({
    counter: {
      justifyContent: 'center',
      alignItems: 'center',
      width: getContainerWidth(),
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
        <Text allowFontScaling={false} inverse>
          {unreadNotifications}
        </Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}
