import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/ui/layout/Screen'
import {ProjectNews} from '@/modules/construction-work/components/project/ProjectNews'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = NavigationProps<ConstructionWorkRouteName.projectNews>

export const ProjectNewsScreen = ({route}: Props) => {
  const {
    params: {id, projectId},
  } = route

  return (
    <Screen
      withLeftInset={false}
      withRightInset={false}>
      <ProjectNews
        id={id}
        projectId={projectId}
      />
    </Screen>
  )
}
