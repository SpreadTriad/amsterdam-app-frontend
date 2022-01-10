import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {color, size} from '../../tokens'

export const stackScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.app,
  },
  headerBackAccessibilityLabel: 'Terug',
  headerBackImage: () => (
    <ChevronLeft
      width={20}
      height={20}
      fill={color.font.regular}
      style={{marginLeft: -4}}
    />
  ),
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: color.background.white,
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerLeftContainerStyle: {
    paddingStart: size.spacing.md,
  },
  headerRightContainerStyle: {
    paddingEnd: size.spacing.md,
  },
  headerTitleAlign: 'center',
}

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: color.touchable.secondary,
  tabBarInactiveTintColor: color.font.regular,
  tabBarLabelStyle: {fontSize: 12, lineHeight: 16},
}
