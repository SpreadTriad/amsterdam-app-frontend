import React from 'react'
import {StyleSheet, View} from 'react-native'

export const FormButtons = ({
  children,
}: {
  children: React.ReactNode | React.ReactChildren
}) => {
  const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent:
        React.Children.count(children) > 1 ? 'space-between' : 'flex-end',
      alignItems: 'center',
    },
  })
  return <View style={styles.buttons}>{children}</View>
}
