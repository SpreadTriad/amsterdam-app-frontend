export enum ConstructionWorkEditorRouteName {
  addMainImageToMessage = 'addMainImageToMessage',
  authorizedProjects = 'authorizedProjects',
  confirmMessage = 'confirmMessage',
  createMessage = 'createMessage',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: undefined
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    id?: string
    showSuccessfullySentMessageAlert?: boolean
  }
  [ConstructionWorkEditorRouteName.confirmMessage]: undefined
  [ConstructionWorkEditorRouteName.createMessage]: {
    projectId: string
    projectTitle: string
  }
}

export enum ConstructionWorkEditorModalName {
  writingGuide = 'WritingGuide',
}

export type ConstructionWorkEditorModalParams = {
  [ConstructionWorkEditorModalName.writingGuide]: {
    projectTitle: string
  }
}
