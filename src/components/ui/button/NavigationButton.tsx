import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {useSelector} from 'react-redux'
import {selectTheme} from '../../../themes'
import {Box} from '../Box'
import {Row} from '../layout'
import {Icon} from '../media'
import {Link} from '../typography'
import {Pressable} from './Pressable'

type Props = {
  label: string
  onPress: () => void
}

export const NavigationButton = ({label, onPress}: Props) => {
  const {theme} = useSelector(selectTheme)

  return (
    <Pressable onPress={onPress}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row align="between" gutter="md">
          <Link label={label} />
          <Icon size={24}>
            <ChevronRight fill={theme.color.pressable.navigation} />
          </Icon>
        </Row>
      </Box>
    </Pressable>
  )
}
