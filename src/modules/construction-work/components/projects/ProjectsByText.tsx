import React from 'react'
import simplur from 'simplur'
import {Box} from '@/components/ui/containers'
import {Gutter} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {ProjectsList} from '@/modules/construction-work/components/projects'
import {useGetProjectsByTextQuery} from '@/modules/construction-work/service'

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
    queryFields: ['title', 'subtitle'],
  })

  return (
    <ProjectsList
      {...result}
      listHeader={<ListHeader results={result.data?.length ?? 0} />}
      noResultsMessage="We hebben geen werkzaamheden gevonden voor deze zoekterm."
    />
  )
}
