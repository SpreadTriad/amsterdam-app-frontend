import {
  WasteGuideEndpointName,
  WasteGuideQueryArg,
  WasteGuideResponse,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services'
import {generateRequestUrl} from '@/utils'

export const wasteGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteGuideEndpointName.getGarbageCollectionAreaByLocation]: builder.query<
      WasteGuideResponse,
      WasteGuideQueryArg
    >({
      query: params => ({
        url: generateRequestUrl({
          params,
        }),
        api: 'garbageCollectionAreaUrl',
      }),
      transformResponse: (response: {result: WasteGuideResponse}) =>
        response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetGarbageCollectionAreaByLocationQuery} = wasteGuideApi
