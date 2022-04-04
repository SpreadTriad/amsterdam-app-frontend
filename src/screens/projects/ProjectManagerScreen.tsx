import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {ProjectManagerSummary} from '../../components/features/projectManager/Summary'
import {Box, Button} from '../../components/ui'
import {size} from '../../tokens'

export type ProjectManagerScreenRouteProp = RouteProp<
  StackParams,
  'ProjectManager'
>

export type ProjectManagerScreenNavigationProps = StackNavigationProp<
  StackParams,
  'ProjectManager'
>

type Props = {
  navigation: ProjectManagerScreenNavigationProps
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => (
  <View style={styles.screenHeight}>
    <ProjectManagerSummary routeParamsId={route.params.id} />
    <Box>
      <Button
        text="Sluit venster"
        onPress={() => navigation.navigate(routes.home.name)}
      />
    </Box>
  </View>
)

const styles = StyleSheet.create({
  screenHeight: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: size.spacing.md,
  },
})
