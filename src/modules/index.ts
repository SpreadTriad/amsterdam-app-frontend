import {module as addressModule} from './address'
import {module as cityOfficesModule} from './city-offices'
import {module as constructionWorkModule} from './construction-work'
import {module as constructionWorkEditorModule} from './construction-work-editor'
import {module as homeModule} from './home'
import {module as openWasteContainerModule} from './open-waste-container'
import {module as reportProblemModule} from './report-problem'
import {module as userModule} from './user'
import {module as wasteGuideModule} from './waste-guide'

const coreModules = [addressModule, homeModule, userModule]

export const clientModules = [
  ...coreModules,
  cityOfficesModule,
  constructionWorkEditorModule,
  constructionWorkModule,
  openWasteContainerModule,
  reportProblemModule,
  wasteGuideModule,
]
