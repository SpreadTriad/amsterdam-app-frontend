import {contactSlice} from '@/modules/contact/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  name: 'ContactModule',
  reduxConfigs: [
    {
      key: 'contact',
      persist: true,
      slice: contactSlice,
    },
  ],
  slug: ModuleSlug.contact,
}
