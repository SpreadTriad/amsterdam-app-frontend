import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {homeRoutes} from './routes'
import {HomeScreen} from './screens'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {theme} = useContext(ThemeContext)
  const {home} = homeRoutes

  return (
    <Stack.Navigator
      initialRouteName={home.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={HomeScreen}
        name={home.name}
        options={home.options}
      />
    </Stack.Navigator>
  )
}
