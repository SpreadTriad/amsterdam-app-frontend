import {module as addressModule} from './address'
import {module as cityOfficesModule} from './city-offices'
import {module as contactModule} from './contact'
import {module as homeModule} from './home'
import {module as openWasteContainerModule} from './open-waste-container'
import {module as constructionWorkModule} from './projects'
import {module as reportProblemModule} from './report-problem'
import {module as userModule} from './user'
import {module as wasteGuideModule} from './waste-guide'

const coreModules = [addressModule, homeModule, userModule]

export const clientModules = [
  ...coreModules,
  wasteGuideModule,
  openWasteContainerModule,
  constructionWorkModule,
  reportProblemModule,
  cityOfficesModule,
  contactModule,
]
