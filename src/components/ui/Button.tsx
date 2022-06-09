import React, {ReactNode} from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {color, font, size} from '../../tokens'
import {Row} from './layout'
import {Icon} from './media'
import {Text} from './'

type Props = {
  icon?: ReactNode
  text?: string
  variant?: 'inverse' | 'primary' | 'secondary' | 'text'
} & Omit<TouchableOpacityProps, 'style'>

const verticalPadding = (44 - font.height.p1) / 2 // Design system: button height must be 44

export const Button = ({
  icon,
  text,
  variant = 'primary',
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.button, styles[variant]]}
      {...otherProps}>
      <Row gutter="md">
        {icon && <Icon size={24}>{icon}</Icon>}
        {text && (
          <Text
            inverse={variant !== 'text'}
            primary={variant === 'inverse'}
            link={variant === 'text'}>
            {text}
          </Text>
        )}
      </Row>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: size.spacing.md,
    paddingVertical: verticalPadding,
  },
  inverse: {
    backgroundColor: color.background.white,
    borderColor: color.touchable.primary,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  primary: {
    backgroundColor: color.touchable.primary,
  },
  secondary: {
    backgroundColor: color.touchable.secondary,
  },
  text: {
    backgroundColor: undefined,
    color: color.touchable.primary,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
})
