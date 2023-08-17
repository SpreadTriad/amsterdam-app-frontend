import {useAddresForCoordinates} from '@/modules/address/hooks/useAddresForCoordinates'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {Address, LocationType} from '@/modules/address/types'

const getSelectedAddress = (
  address?: Address,
  locationAddress?: Address,
  locationType?: LocationType,
) => {
  switch (locationType) {
    case 'address':
      return address
    case 'location':
      return locationAddress
    default:
      return
  }
}

/**
 * Return either the user profile address or the addres for their location (current or last known), depending on the location type.
 * Requires a location type: different modules may have different location types selected, so the location type is not part of the Address module itself.
 * The address for location is a query request response. If locationType is 'location', the isError and isFetching properties will be set to be able handle loading/error states.
 */
export const useSelectedAddress = (
  locationType?: LocationType,
  lastKnown = false,
) => {
  const address = useAddress()
  const {data, isError, isFetching} = useAddresForCoordinates(lastKnown)

  return {
    address: getSelectedAddress(address, data, locationType),
    isError: locationType === 'location' && isError,
    isFetching: locationType === 'location' && isFetching,
  }
}
