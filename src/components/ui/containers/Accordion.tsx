import React, {ReactNode, useCallback, useState} from 'react'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers/Box'
import {Column, Gutter, Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {useTheme} from '@/themes'

type AccordionProps = {
  children: ReactNode
  initialExpansionState?: boolean
  onExpansionStateChange?: (state: boolean) => void
  title: string
}

type PanelProps = {
  isExpanded: boolean
} & Pick<AccordionProps, 'children'>

const Panel = ({children, isExpanded}: PanelProps) => {
  if (!isExpanded) {
    return null
  }

  return (
    <>
      <Box insetHorizontal="md">{children}</Box>
      <Gutter height="md" />
    </>
  )
}

export const Accordion = ({
  initialExpansionState,
  onExpansionStateChange,
  children,
  title,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(!!initialExpansionState)
  const iconName = isExpanded ? 'chevron-up' : 'chevron-down'
  const {text} = useTheme()

  const handleStateChange = useCallback(
    (state: boolean) => {
      setIsExpanded(state)
      onExpansionStateChange?.(state)
    },
    [onExpansionStateChange],
  )

  return (
    <Column grow>
      <Pressable
        accessibilityHint={`${title}, Dubbeltik om de inhoud te ${
          isExpanded ? 'verbergen' : 'bekijken'
        }`}
        accessibilityState={{expanded: isExpanded}}
        onPress={() => handleStateChange(!isExpanded)}>
        <Box>
          <Row align="between" gutter="md" valign="start">
            <Title
              color="link"
              ellipsizeMode="tail"
              level="h5"
              numberOfLines={3}
              text={title}
            />
            <Size height={text.fontSize.h5 * text.lineHeight.h5}>
              <Icon color="link" name={iconName} size="lg" />
            </Size>
          </Row>
        </Box>
      </Pressable>
      <Panel {...{children, isExpanded}} />
    </Column>
  )
}
