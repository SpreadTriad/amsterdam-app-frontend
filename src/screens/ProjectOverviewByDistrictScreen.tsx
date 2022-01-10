import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {MenuStackParams} from '../app/navigation'
import {menuRoutes} from '../app/navigation/routes'
import {ProjectCard} from '../components/features/project'
import {NonScalingHeaderTitle, PleaseWait} from '../components/ui'
import {Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {size} from '../tokens'
import {District, ProjectOverviewItem} from '../types'

type ProjectOverviewByDistrictScreenRouteProp = RouteProp<
  MenuStackParams,
  'ProjectOverviewByDistrict'
>

type Props = {
  navigation: StackNavigationProp<MenuStackParams, 'ProjectDetail'>
  route: ProjectOverviewByDistrictScreenRouteProp
}

export const ProjectOverviewByDistrictScreen = ({navigation, route}: Props) => {
  const [gridWidth, setGridWidth] = useState(0)
  const districtId = route.params.id

  const {data: districts, isLoading: isDistrictsLoading} = useFetch<District[]>(
    {
      url: getEnvironment().apiUrl + '/districts',
    },
  )

  const {data: projects, isLoading: isProjectsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        'district-id': districtId,
      },
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NonScalingHeaderTitle
          text={districts?.find(d => d.id === districtId)?.name ?? ''}
        />
      ),
    })
  })

  // We need to calculate widths because FlatList items don’t flex as expected
  const screenInset = size.spacing.md
  const gridGutter = 'sm'
  const gridGutterWidth = size.spacing[gridGutter]
  const projectCardMinWidth = 18 * size.spacing.md
  const numColumns = Math.floor(gridWidth / projectCardMinWidth)
  const projectCardWidth = Math.floor(
    (gridWidth - 2 * screenInset - (numColumns - 1) * gridGutterWidth) /
      numColumns,
  )

  const styles = StyleSheet.create({
    box: {
      paddingHorizontal: screenInset,
      paddingTop: screenInset,
    },
    fullHeight: {
      height: '100%',
    },
    grid: {
      paddingBottom: screenInset,
    },
  })

  return (
    <View
      style={styles.box}
      onLayout={event => {
        setGridWidth(event.nativeEvent.layout.width)
      }}>
      {isDistrictsLoading || isProjectsLoading || gridWidth === 0 ? (
        <PleaseWait />
      ) : (
        <FlatList
          contentContainerStyle={styles.grid}
          key={`re-render-${numColumns}`}
          data={projects}
          ItemSeparatorComponent={() => <Gutter height={gridGutter} />}
          keyExtractor={item => item.identifier.toString()}
          numColumns={numColumns}
          renderItem={({item, index}) => (
            <>
              <ProjectCard
                imageSource={{
                  uri: item.images[0].sources['460px'].url,
                }}
                onPress={() =>
                  navigation.navigate(menuRoutes.projectDetail.name, {
                    id: item.identifier,
                  })
                }
                subtitle={item.subtitle ?? undefined}
                title={item.title}
                width={projectCardWidth}
              />
              {index % numColumns < numColumns - 1 && (
                <Gutter width={gridGutter} />
              )}
            </>
          )}
        />
      )}
    </View>
  )
}
