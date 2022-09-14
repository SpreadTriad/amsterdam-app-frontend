import React, {SVGProps} from 'react'
import {useDispatch} from 'react-redux'
import {CityOffice as CityOfficeIcon} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {setSelectedCityOffice} from '@/modules/contact/slice'
import {CityOffice} from '@/modules/contact/types'
import {setBottomSheetIsExpanded} from '@/store'
import {Theme, useThemable} from '@/themes'

type Props = {
  cityOffice: CityOffice
}

export const CityOfficeButton = ({cityOffice}: Props) => {
  const dispatch = useDispatch()
  const iconProps = useThemable(createIconProps)

  const selectCityOffice = (identifier: CityOffice['identifier']) => {
    dispatch(setSelectedCityOffice(identifier))
    dispatch(setBottomSheetIsExpanded(false))
  }

  return (
    <Pressable onPress={() => selectCityOffice(cityOffice.identifier)}>
      <Box>
        <Row gutter="md">
          <Icon size={24}>
            <CityOfficeIcon {...iconProps} />
          </Icon>
          <Title color="link" level="h5" text={cityOffice.title} />
        </Row>
      </Box>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
