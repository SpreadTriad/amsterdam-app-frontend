import React from 'react'
import simplur from 'simplur'
import {ProjectsBy} from './ProjectsBy'
import {Box} from '@/components/ui'
import {Gutter} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {useGetProjectsByTextQuery} from '@/modules/construction-work/construction-work.service'

type ListHeaderProps = {
  results: number
}

const ListHeader = ({results}: ListHeaderProps) => (
  <Box insetHorizontal="md">
    <Paragraph>{simplur`${results} zoekresulta[at|ten]`}</Paragraph>
    <Gutter height="lg" />
  </Box>
)

type Props = {
  searchText: string
}

export const ProjectsByText = ({searchText}: Props) => {
  const result = useGetProjectsByTextQuery({
    fields: ['identifier', 'images', 'subtitle', 'title'],
    text: searchText,
    queryFields: ['subtitle', 'title'],
  })

  return (
    <ProjectsBy
      {...result}
      listHeader={<ListHeader results={result.data?.length ?? 0} />}
      noResultsMessage="We hebben geen werkzaamheden gevonden voor deze zoekterm."
    />
  )
}
