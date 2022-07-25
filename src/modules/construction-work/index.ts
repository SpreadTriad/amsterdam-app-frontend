import {constructionWorkSlice} from '@/modules/construction-work/construction-work.slice'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  slug: ModuleSlug['construction-work'],
  state: [constructionWorkSlice],
}
