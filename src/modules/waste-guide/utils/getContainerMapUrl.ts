// Remove once the waste guide API includes this as a single property
import {Address} from '@/modules/address/types'
import {FractionCode, WasteGuideUrl} from '@/modules/waste-guide/types'
import {getSquareMapArea} from '@/modules/waste-guide/utils/getSquareMapArea'

const wasteTypeMapping: Record<
  Exclude<FractionCode, FractionCode.GA> | 'Brood',
  number[]
> = {
  Rest: [12491],
  Glas: [12492],
  Papier: [12493],
  Plastic: [12494],
  Textiel: [12495, 13698],
  Brood: [12497],
  GFT: [12496],
}

const getLocationTypes = (fractionCode?: FractionCode) => {
  if (
    fractionCode &&
    Object.keys(wasteTypeMapping).includes(fractionCode) &&
    fractionCode !== FractionCode.GA
  ) {
    return wasteTypeMapping[fractionCode].join(',')
  }

  return Object.values(wasteTypeMapping).join(',')
}

export const getContainerMapUrl = (
  coordinates?: Address['coordinates'],
  fractionCode?: FractionCode,
) => {
  if (!coordinates) {
    return
  }

  const locationTypes = getLocationTypes(fractionCode)
  const {lat, lon} = coordinates
  const queryParam = fractionCode ? `?fractie=${fractionCode}` : ''
  const fragment = getSquareMapArea(lat, lon, 0.002)

  return fragment
    ? `${WasteGuideUrl.wasteContainersUrl}${queryParam}#${fragment}/topo/${locationTypes}//`
    : WasteGuideUrl.wasteContainersUrl
}
