import React from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui'
import {PleaseWait} from '@/components/ui/feedback'
import {Gutter} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {CityOfficeButton} from '@/modules/contact/components'
import {useGetCityOfficesQuery} from '@/modules/contact/service'

type Props = {
  toggleBottomSheet: () => void
}

const ItemSeparator = () => <Gutter height="sm" />

export const SelectCityOffice = ({toggleBottomSheet}: Props) => {
  const {data: cityOffices, isLoading} = useGetCityOfficesQuery()

  if (isLoading || !cityOffices) {
    return <PleaseWait />
  }

  return (
    <Box grow>
      <Title level="h3" text="Stadsloketten" />
      <Gutter height="md" />
      <FlatList
        data={cityOffices}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={i => i.identifier}
        renderItem={({item}) => (
          <CityOfficeButton
            cityOffice={item}
            toggleBottomSheet={toggleBottomSheet}
          />
        )}
      />
    </Box>
  )
}
