import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Gutter, ScreenWrapper} from '../components/ui'
import {Borough, boroughs, projects} from '../data/projects'
import {spacing} from '../tokens'

type ProjectOverviewByBoroughScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectOverviewByBorough'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectOverviewByBoroughScreenRouteProp
}

export const ProjectOverviewByBoroughScreen = ({route, navigation}: Props) => {
  const {boroughId} = route.params
  const borough: Borough | undefined = boroughs.find(b => b.id === boroughId)
  const projectsByBorough = projects.filter(p => p.boroughId === boroughId)

  return borough && projectsByBorough ? (
    <ScreenWrapper>
      <Box>
        <FlatList
          data={projectsByBorough}
          ItemSeparatorComponent={() => <Gutter height={spacing.md} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProjectCard
              imageSource={item.imageSource}
              title={item.title}
              onPress={() =>
                navigation.navigate('ProjectDetail', {id: item.id})
              }
            />
          )}
        />
      </Box>
    </ScreenWrapper>
  ) : null
}
