import React from 'react'
import {StyleSheet, View} from 'react-native'

export type CardProps = {
  children: React.ReactNode
}

export type CardBodyProps = CardProps

export const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

export const CardBody = ({children}: CardBodyProps) => (
  <View style={styles.cardBody}>{children}</View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
  },
  cardBody: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
})
