import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ConstructionWorkEditorModalName,
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {AddMainImageToMessageScreen} from '@/modules/construction-work-editor/screens/AddMainImageToMessage.screen'
import {AuthorizedProjectsScreen} from '@/modules/construction-work-editor/screens/AuthorizedProjects.screen'
import {ConfirmMessageScreen} from '@/modules/construction-work-editor/screens/ConfirmMessage.screen'
import {CreateMessageScreen} from '@/modules/construction-work-editor/screens/CreateMessage.screen'
import {WritingGuideScreen} from '@/modules/construction-work-editor/screens/WritingGuide.screen'

export const screenConfig: StackNavigationRoutes<
  ConstructionWorkEditorStackParams,
  ConstructionWorkEditorRouteName
> = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    component: AuthorizedProjectsScreen,
    name: ConstructionWorkEditorRouteName.authorizedProjects,
    options: {
      headerTitle: 'Plaats berichten',
    },
  },
  [ConstructionWorkEditorRouteName.createMessage]: {
    component: CreateMessageScreen,
    requiresAuthorization: true,
    name: ConstructionWorkEditorRouteName.createMessage,
  },
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: {
    component: AddMainImageToMessageScreen,
    requiresAuthorization: true,
    name: ConstructionWorkEditorRouteName.addMainImageToMessage,
  },
  [ConstructionWorkEditorRouteName.confirmMessage]: {
    component: ConfirmMessageScreen,
    requiresAuthorization: true,
    name: ConstructionWorkEditorRouteName.confirmMessage,
  },
}

export const constructionWorkEditorModals: StackNavigationRoutes<
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorModalName
> = {
  [ConstructionWorkEditorModalName.writingGuide]: {
    component: WritingGuideScreen,
    name: ConstructionWorkEditorModalName.writingGuide,
  },
}
