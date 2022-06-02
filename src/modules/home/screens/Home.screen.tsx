import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '../../../app/navigation'
import {AddButton, Box} from '../../../components/ui'
import {Column, Gutter} from '../../../components/ui/layout'
import {Screen} from '../../../components/ui/layout/Screen'
import {selectTheme} from '../../../themes'
import {module as homeModule} from '../../home'
import {Modules} from '../components'
import {HomeRouteName, HomeStackParams} from '../routes'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()

  return (
    <Screen>
      <Column align="between">
        <Modules />
        <Box>
          <AddButton
            onPress={() => navigation.navigate(HomeRouteName.settings)}
          />
          <Gutter height="lg" />
        </Box>
      </Column>
    </Screen>
  )
}
