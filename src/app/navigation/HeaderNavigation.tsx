import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Insets, StyleSheet, TouchableOpacity} from 'react-native'
import {BellInactive, Settings} from '../../assets/icons'
import {NotificationsCounter} from '../../components/features/notifications'
import {Row} from '../../components/ui/layout'
import {color, size} from '../../tokens'
import {routes} from './routes'
import {StackParams, TabParams} from './types'

const hitSlop: Insets = {
  top: size.spacing.sm,
  bottom: size.spacing.sm,
  left: size.spacing.sm,
  right: size.spacing.sm,
}

const iconProps = {
  fill: color.font.regular,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()

  return (
    <Row gutter="md">
      <TouchableOpacity
        accessibilityLabel="Berichten"
        accessibilityRole="button"
        hitSlop={hitSlop}
        key="notifications"
        onPress={() => navigation.navigate(routes.notificationOverview.name)}
        style={styles.icon}>
        <BellInactive {...iconProps} />
        <NotificationsCounter style={styles.badge} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Instellingen"
        accessibilityRole="button"
        hitSlop={hitSlop}
        key="settings"
        onPress={() => navigation.navigate(routes.settings.name)}
        style={styles.icon}>
        <Settings {...iconProps} />
      </TouchableOpacity>
    </Row>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -12,
    top: -5,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
  },
})
