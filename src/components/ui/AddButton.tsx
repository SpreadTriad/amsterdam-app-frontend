import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {ComponentProps, ElementType, useContext} from 'react'

import {StyleSheet, TouchableHighlight} from 'react-native'
import {ThemeContext} from '../../themes'
import {color, size} from '../../tokens'

type Props<T extends ElementType> = ComponentProps<T>

export const AddButton = <T extends ElementType>(props: Props<T>) => {
  const {theme} = useContext(ThemeContext)

  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={styles.button}
      underlayColor={theme.color.pressable.pressed.background}
      {...props}>
      <Enlarge style={styles.icon} />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: size.spacing.md,
    alignItems: 'center',
    borderColor: color.border.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
    fill: color.font.primary,
  },
})
