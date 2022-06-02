import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {AddressRouteName, addressRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const AddressStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={AddressRouteName.addressForm}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
