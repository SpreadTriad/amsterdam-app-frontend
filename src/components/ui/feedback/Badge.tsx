import {useContext} from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Device, DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'
import {OmitUndefined} from '@/types'
import {formatNumber} from '@/utils'

export type BadgeProps = {
  testID?: string | undefined
  /**
   * The value to display in the badge.
   */
  value: number
  /**
   * Which variant of the badge to display..
   */
  variant?: 'default' | 'on-icon' | 'small'
} & Pick<AccessibilityProps, 'accessibilityLabel'>

export const Badge = ({
  accessibilityLabel,
  testID,
  value,
  variant = 'default',
}: BadgeProps) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useThemable(createStyles(fontScale, variant))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <Text
          accessibilityLabel={accessibilityLabel}
          accessible={!!variantConfig[variant]}
          numberOfLines={1}
          style={styles.text}
          testID={testID}>
          {formatNumber(value)}
        </Text>
      </View>
    </Row>
  )
}

type VariantConfig = {
  [v in OmitUndefined<BadgeProps['variant']>]: {
    accessible?: boolean
    diameter: number
    text: number
  }
}

const variantConfig: VariantConfig = {
  default: {
    diameter: 22,
    text: 14,
  },
  'on-icon': {
    accessible: false,
    diameter: 16,
    text: 12,
  },
  small: {
    diameter: 16,
    text: 12,
  },
}

const createStyles =
  (
    fontScale: Device['fontScale'],
    variant: OmitUndefined<BadgeProps['variant']>,
  ) =>
  ({color, size, text}: Theme) => {
    const {diameter, text: textSize} = variantConfig[variant]
    const scalesWithFont = variant !== 'on-icon'
    const scaleFactor = scalesWithFont ? fontScale : 1

    const scaledDiameter = diameter * scaleFactor
    const scaledTextSize = textSize * scaleFactor

    return StyleSheet.create({
      circle: {
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: scaledDiameter, // Prevent the circle becoming a vertical oval
        paddingStart: size.spacing.xs + 0.5, // Nudge center-alignment because of even width
        paddingEnd: size.spacing.xs,
        borderRadius: scaledDiameter / 2,
        backgroundColor: color.pressable.secondary.background,
      },
      text: {
        fontFamily: text.fontFamily.bold,
        fontSize: scaledTextSize,
        lineHeight: scaledDiameter,
        color: color.text.inverse,
      },
    })
  }
