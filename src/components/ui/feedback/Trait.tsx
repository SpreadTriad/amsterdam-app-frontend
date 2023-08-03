import {ReactNode} from 'react'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {IconName} from '@/components/ui/media/iconPaths'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  /**
   * Allows a custom visualization for the trait.
   * Use a small component here. Not rendered if an icon name is provided.
   */
  children?: ReactNode
  /**
   * The name of the icon to visually support the trait label.
   */
  iconName?: IconName
  /**
   * The label identifying the trait.
   * Should be one or a few words.
   */
  label: string
} & Required<TestProps>

export const Trait = ({children, iconName, label, testID}: Props) => (
  <Row
    gutter="sm"
    valign="center">
    {iconName ? (
      <Icon
        name={iconName}
        testID={`${testID}Icon`}
      />
    ) : (
      children
    )}
    <Phrase
      testID={`${testID}Label`}
      variant="small">
      {label}
    </Phrase>
  </Row>
)
