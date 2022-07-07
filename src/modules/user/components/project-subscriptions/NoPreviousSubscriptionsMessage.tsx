import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {module as userModule} from '../..'
import {RootStackParams} from '../../../../app/navigation'
import {Attention, Text} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {module as constructionWorkModule} from '../../../construction-work'
import {ConstructionWorkRouteName} from '../../../construction-work/routes'
import {TextButton} from '@/components/ui/buttons'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  return (
    <Column gutter="md">
      <Attention>
        <Text>
          U kunt nu kiezen van welke bouwprojecten u berichten wilt ontvangen.
        </Text>
      </Attention>
      <TextButton
        emphasis
        label="Naar bouwprojecten"
        onPress={() =>
          navigation.navigate(constructionWorkModule.slug, {
            screen: ConstructionWorkRouteName.projects,
          })
        }
      />
    </Column>
  )
}
