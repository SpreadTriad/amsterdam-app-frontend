import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {StackParams} from '../../app/navigation'
import {ProjectListForDistrict} from '../../components/features/projects'
import {NonScalingHeaderTitle} from '../../components/ui'
import {useGetDistrictsQuery} from '../../services'

type ProjectOverviewForDistrictScreenRouteProp = RouteProp<
  StackParams,
  'ProjectOverviewForDistrict'
>

type Props = {
  navigation: StackNavigationProp<StackParams, 'ProjectDetail'>
  route: ProjectOverviewForDistrictScreenRouteProp
}

export const ProjectOverviewForDistrictScreen = ({
  navigation,
  route,
}: Props) => {
  const districtId = route.params.id

  const {data: districts} = useGetDistrictsQuery()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NonScalingHeaderTitle
          text={districts?.find(d => d.id === districtId)?.name ?? ''}
        />
      ),
    })
  })

  return <ProjectListForDistrict districtId={districtId} />
}
