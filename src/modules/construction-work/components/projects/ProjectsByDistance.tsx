import {useCallback, useState} from 'react'
import {FlatGridProps} from 'react-native-super-grid'
import {Address} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {
  config,
  ProjectsList,
  ProjectsListHeader,
  SearchFieldNavigator,
} from '@/modules/construction-work/components/projects'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {useInfiniteScroller} from '@/modules/construction-work/hooks'
import {ProjectsItem} from '@/modules/construction-work/types'

type Props = {
  address: Address
}

export const ProjectsByDistance = ({address}: Props) => {
  const {projectItemListPageSize} = config
  const [itemsPerRow, setItemsPerRow] = useState(1)
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(
    viewableItemIndex,
    itemsPerRow,
    projectItemListPageSize,
  )
  const result = useInfiniteScroller(page, projectItemListPageSize, address)

  const onViewableItemsChanged = useCallback<
    NonNullable<FlatGridProps<ProjectsItem>['onViewableItemsChanged']>
  >(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2)
      const foundIndex = viewableItems[middleIndex].index
      if (foundIndex) {
        setViewableItemIndex(foundIndex)
      }
    }
  }, [])

  const {adres: addressText} = address

  const getProjectTraits: (project: ProjectsItem) => Partial<ProjectsItem> =
    useCallback(
      ({followed, meter, recent_articles, strides}) => ({
        followed,
        meter,
        recent_articles,
        strides,
      }),
      [],
    )

  return (
    <ProjectsList
      {...result}
      getProjectTraits={getProjectTraits}
      listHeader={
        <ProjectsListHeader>
          <SearchFieldNavigator />
          <StreetAddressWithEditButton
            accessibilityLabel={`Werkzaamheden dichtbij ${addressText}`}
            address={`Dichtbij ${addressText}`}
            testIDButton="ConstructionWorkButtonEditAddress"
            testIDLabel="ConstructionWorkTextAddress"
          />
        </ProjectsListHeader>
      }
      noResultsMessage="We hebben geen werkzaamheden gevonden dichtbij dit adres."
      onItemsPerRowChange={value => setItemsPerRow(value)}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}
