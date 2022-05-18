import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {BannerCard} from '../../../components/features'
import {wasteGuideRoutes} from '../routes'

export const RecyclingGuideBanner = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'WasteGuideModule'>>()

  return (
    <BannerCard
      border
      imageSource={require('../../../assets/images/banner-illustratie-welkafvalhoortwaar.png')}
      onPress={() => navigation.navigate(wasteGuideRoutes.recyclingGuide.name)}
      subtitle="Bekijk de afvalscheidingswijzer"
      title="Welk afval hoort waar?"
    />
  )
}
