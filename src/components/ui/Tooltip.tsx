import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from '@/components/ui/'
import {Theme, useThemable} from '@/themes'

type Props = {
  text: string
}

export const Tooltip = ({text}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.tooltip}>
      <Text inverse>{text}</Text>
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: size.spacing.md,
      backgroundColor: color.background.inverse,
    },
  })
