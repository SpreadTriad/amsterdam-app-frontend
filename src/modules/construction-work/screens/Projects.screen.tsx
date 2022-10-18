import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
} from '@/modules/construction-work/components/projects'
import {
  selectConstructionWorkIsSearching,
  selectConstructionWorkSearchText,
} from '@/modules/construction-work/slice'

export const ProjectsScreen = () => {
  const address = useSelector(selectAddress)
  const isSearching = useSelector(selectConstructionWorkIsSearching)
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasAddress = !!address.adres
  const hasSearchText = !!searchText

  return (
    <Screen scroll={false} withBottomInset={false}>
      <Box insetHorizontal="md">
        <ProjectsTextSearchField />
        {!hasAddress && !isSearching && <ProvideAddressButton />}
      </Box>
      {isSearching ? (
        hasSearchText ? (
          <ProjectsByText searchText={searchText} />
        ) : null
      ) : hasAddress ? (
        <ProjectsByDistance address={address} />
      ) : (
        <ProjectsByDate />
      )}
    </Screen>
  )
}
