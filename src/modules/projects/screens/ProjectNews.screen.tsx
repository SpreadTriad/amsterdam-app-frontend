import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ProjectNews} from '../components/project'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

type ProjectNewsScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectNews
>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => (
  <ProjectNews id={route.params.id} />
)
