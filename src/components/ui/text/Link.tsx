import React, {SVGProps} from 'react'
import {ChevronLeft, ChevronRight, ExternalLink} from '@/assets/icons'
import {Pressable} from '@/components/ui/buttons'
import {Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text/Phrase'
import {Direction} from '@/components/ui/types'
import {Theme, useThemable, useTheme} from '@/themes'

type Props = {
  label: string
  onPress: () => void
  variant?: 'backward' | 'default' | 'external' | 'forward'
}

type LinkIconProps = {
  direction?: Direction.left | Direction.right
  external?: boolean
}

const LinkIcon = ({direction, external}: LinkIconProps) => {
  const ChevronIcon = external
    ? ExternalLink
    : direction === Direction.left
    ? ChevronLeft
    : ChevronRight
  const iconProps = useThemable(createIconProps)
  const {text} = useTheme()

  return (
    <Size height={1.4 * text.fontSize.body}>
      <Icon>
        <ChevronIcon {...iconProps} />
      </Icon>
    </Size>
  )
}

export const Link = ({label, onPress, variant = 'default'}: Props) => {
  const {text} = useTheme()

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={
        variant === 'external' ? label + ', opent in webbrowser' : label
      }
      hitSlop={(48 - 1.4 * text.fontSize.body) / 2}
      onPress={onPress}>
      <Row gutter="sm">
        {variant === 'backward' && <LinkIcon direction={Direction.left} />}
        {variant === 'default' && <LinkIcon direction={Direction.right} />}
        <Phrase color="link">{label}</Phrase>
        {variant === 'forward' && <LinkIcon direction={Direction.right} />}
        {variant === 'external' && <LinkIcon external />}
      </Row>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
