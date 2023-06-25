import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {wasteGuideSlice} from '@/modules/waste-guide/slice'

export const module: ModuleClientConfig = {
  name: 'WasteGuideModule',
  reduxConfig: [
    {
      key: 'wasteGuide',
      persist: true,
      slice: wasteGuideSlice,
    },
  ],
  slug: ModuleSlug['waste-guide'],
}
