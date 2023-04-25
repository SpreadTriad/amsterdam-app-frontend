import {Address, BagResponse, ResponseAddress} from '@/modules/address'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types'
import {generateRequestUrl} from '@/utils'

const addressPath = '/search/adres/'
const bagPath = '/typeahead/bag/'

type AddresParams = {
  address: string
  city: Address['woonplaats']
}

export const addressApi = baseApi.injectEndpoints({
  endpoints: ({query}) => ({
    getAddress: query<Address, AddresParams>({
      query: ({address}) => ({
        url: generateRequestUrl({
          params: {features: 2, q: address},
          path: addressPath,
        }),
        api: 'atlasUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
      transformResponse: ({results}: ResponseAddress, _meta, {city}) => {
        const address = results.find(r => r.woonplaats === city) ?? results[0]
        const {
          adres,
          bag_huisletter,
          bag_toevoeging,
          centroid,
          huisnummer,
          landelijk_id,
          postcode,
          straatnaam,
          woonplaats,
        } = address
        return {
          adres,
          bag_huisletter,
          bag_toevoeging,
          coordinates: {
            lat: centroid[1],
            lon: centroid[0],
          },
          huisnummer,
          bagNummeraanduidingId: landelijk_id,
          postcode,
          straatnaam,
          woonplaats,
        }
      },
    }),
    getBag: query<BagResponse | undefined, string>({
      query: address => ({
        url: generateRequestUrl({
          params: {features: 2, q: address},
          path: bagPath,
        }),
        api: 'atlasUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
      transformResponse: (bagResponse: BagResponse[]) =>
        bagResponse?.find(
          ({label}) => label === 'Adressen' || label === 'Straatnamen',
        ),
    }),
  }),
  overrideExisting: true,
})

export const {useGetAddressQuery, useGetBagQuery} = addressApi
