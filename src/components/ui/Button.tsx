import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import {color, size} from '../../tokens'
import {Gutter, Text} from './'

type Props = {
  icon?: React.ReactElement
  text?: string
  variant?: 'inverse' | 'primary' | 'secondary' | 'text'
} & Omit<TouchableOpacityProps, 'style'>

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
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {icon && text && <Gutter width={size.spacing.md} />}
      {text && (
        <Text
          inverse={variant !== 'text'}
          primary={variant === 'inverse'}
          link={variant === 'text'}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
  },
  iconContainer: {
    height: 20,
    width: 20,
  },
  inverse: {
    backgroundColor: color.background.lighter,
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
    paddingHorizontal: size.spacing.sm,
  },
})
