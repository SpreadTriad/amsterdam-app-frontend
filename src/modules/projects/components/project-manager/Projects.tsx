import {List} from '@amsterdam/asc-assets'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {size} from '../../../../tokens'
import {Project} from '../../../../types'
import {ProjectsRouteName} from '../../routes'
import {ProjectManagerScreenNavigationProps} from '../../screens'
import {ProjectTitle} from '../project'

type Props = {
  projects: Project[] | undefined
}

export const ProjectManagerProjects = ({projects}: Props) => {
  const navigation = useNavigation<ProjectManagerScreenNavigationProps>()

  if (!projects || !projects.length) {
    return null
  }

  return (
    <List>
      {projects.map(project => (
        <TouchableOpacity
          accessibilityRole="button"
          key={project.identifier}
          onPress={() => {
            navigation.navigate(ProjectsRouteName.projectDetail, {
              id: project.identifier,
            })
          }}
          style={styles.button}>
          <ProjectTitle
            title={project.title}
            subtitle={project.subtitle ?? undefined}
          />
        </TouchableOpacity>
      ))}
    </List>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: size.spacing.sm,
  },
})
