import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {ProjectsRouteName, projectRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const ProjectsStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={ProjectsRouteName.projects}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, {name, options, component}]) => (
        <Stack.Screen
          key={key}
          name={name}
          options={options}
          component={component!} //TODO "!" should be removed when component is no longer optional
        />
      ))}
    </Stack.Navigator>
  )
}
