import {contactSlice} from '@/modules/contact/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKeys'

export const module: ModuleClientConfig = {
  name: 'ContactModule',
  reduxConfigs: [
    {
      key: ReduxKey.contact,
      persistVersion: 0,
      slice: contactSlice,
    },
  ],
  slug: ModuleSlug.contact,
}
