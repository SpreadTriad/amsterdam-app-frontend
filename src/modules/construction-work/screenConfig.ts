import {StackNavigationRoutes} from '@/app/navigation'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {
  ProjectBodyScreen,
  ProjectNewsScreen,
  ProjectScreen,
  ProjectsScreen,
  ProjectWarningScreen,
} from '@/modules/construction-work/screens'

export const constructionWorkScreenConfig: StackNavigationRoutes<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName
> = {
  [ConstructionWorkRouteName.projects]: {
    component: ProjectsScreen,
    name: ConstructionWorkRouteName.projects,
    options: {
      headerTitle: 'Werkzaamheden',
    },
  },
  [ConstructionWorkRouteName.project]: {
    component: ProjectScreen,
    name: ConstructionWorkRouteName.project,
  },
  [ConstructionWorkRouteName.projectBody]: {
    component: ProjectBodyScreen,
    name: ConstructionWorkRouteName.projectBody,
  },
  [ConstructionWorkRouteName.projectNews]: {
    component: ProjectNewsScreen,
    name: ConstructionWorkRouteName.projectNews,
  },
  [ConstructionWorkRouteName.projectWarning]: {
    component: ProjectWarningScreen,
    name: ConstructionWorkRouteName.projectWarning,
  },
}
