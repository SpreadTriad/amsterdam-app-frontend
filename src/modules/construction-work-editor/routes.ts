export enum ConstructionWorkEditorRouteName {
  addMainImageToMessage = 'addMainImageToMessage',
  authorizedProjects = 'authorizedProjects',
  confirmMessage = 'confirmMessage',
  createMessage = 'createMessage',
  writingGuide = 'WritingGuide',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: undefined
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    id?: string
  }
  [ConstructionWorkEditorRouteName.confirmMessage]: undefined
  [ConstructionWorkEditorRouteName.createMessage]: {
    projectId: string
    projectTitle: string
  }
  [ConstructionWorkEditorRouteName.writingGuide]: {
    projectTitle: string
  }
}
