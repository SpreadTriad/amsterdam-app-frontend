import {migrations} from '@/modules/address/migrations'
import {addressSlice} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const addressModule: CoreModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  reduxConfigs: [
    {
      key: ReduxKey.address,
      migrations,
      persistVersion: 0,
      slice: addressSlice,
      persistWhitelist: ['address'],
    },
  ],
}
