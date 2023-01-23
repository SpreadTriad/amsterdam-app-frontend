import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AddButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {Modules} from '@/modules/home/components'
import {HomeRouteName, HomeStackParams} from '@/modules/home/routes'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()

  return (
    <Screen
      stickyFooter={
        <Box>
          <AddButton
            accessibilityLabel="Instellingen"
            onPress={() => navigation.navigate(HomeRouteName.settings)}
          />
        </Box>
      }>
      <Modules />
    </Screen>
  )
}
