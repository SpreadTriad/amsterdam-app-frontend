import {ReactNode} from 'react'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  children: ReactNode
  onPress: () => void
} & TestProps

export const InlineLink = ({children, onPress, testID}: Props) => (
  <Phrase
    accessibilityRole="link"
    color="link"
    emphasis="strong"
    {...{onPress, testID}}>
    {children}
  </Phrase>
)
