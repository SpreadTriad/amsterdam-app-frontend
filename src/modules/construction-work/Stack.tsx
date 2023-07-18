import {screenOptions} from '@/app/navigation'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {screenConfig} from '@/modules/construction-work/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ConstructionWorkStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkRouteName.constructionWork}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
