import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Gutter, ScreenWrapper, Title} from '../components/ui'
import {projects} from '../data/projects'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

export const ProjectOverviewByBoroughScreen = ({navigation}: Props) => {
  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <View style={styles.titleRow}>
          <Title level={2} prose text="Centrum" />
        </View>
        <FlatList
          data={projects}
          ItemSeparatorComponent={() => <Gutter height={10} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProjectCard
              id={item.id}
              imageSource={item.imageSource}
              title={item.title}
              navigation={navigation}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    marginBottom: 15,
  },
  screen: {
    padding: 15,
  },
})
