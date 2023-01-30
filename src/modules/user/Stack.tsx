import {createStackNavigator} from '@react-navigation/stack'
import {screenOptions} from '@/app/navigation'
import {UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const UserStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
      screenOptions={screenOptions(theme, {
        screenType: 'settings',
      })}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
