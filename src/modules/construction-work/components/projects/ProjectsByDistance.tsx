import {Address} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {Projects} from '@/modules/construction-work/components/projects'
import {getProjectTraits} from '@/modules/construction-work/components/projects/utils/getProjectTraits'
import {recentArticleMaxAge} from '@/modules/construction-work/config'

type Props = {
  address: Address
}

export const ProjectsByDistance = ({address}: Props) => {
  const {adres: addressText} = address ?? {centroid: []}

  const addressParams = address
    ? {
        address: address.coordinates.lat ? '' : addressText,
        ...address.coordinates,
      }
    : {}
  const queryParams = {
    ...addressParams,
    articles_max_age: recentArticleMaxAge,
    fields: [
      'followed',
      'identifier',
      'images',
      'publication_date',
      'recent_articles',
      'subtitle',
      'title',
    ],
  }

  return (
    <Projects
      getProjectTraits={getProjectTraits}
      HeaderButton={
        <StreetAddressWithEditButton
          accessibilityLabel={`Werkzaamheden dichtbij ${addressText}`}
          address={`Dichtbij ${addressText}`}
          testIDButton="ConstructionWorkButtonEditAddress"
          testIDLabel="ConstructionWorkTextAddress"
        />
      }
      queryParams={queryParams}
    />
  )
}
