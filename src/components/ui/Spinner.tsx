import SpinnerIcon from '@amsterdam/asc-assets/static/icons/Spinner.svg'
import React, {useEffect, useState} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'
import {color} from '../../tokens'

const initialRotation = 0

export const Spinner = () => {
  const [rotation] = useState(new Animated.Value(initialRotation))

  const startAnimation = () => {
    rotation.setValue(initialRotation)

    Animated.timing(rotation, {
      toValue: 360,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => startAnimation())
  }

  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    startAnimation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[styles.size, {transform: [{rotate}]}]}>
      <SpinnerIcon fill={color.font.regular} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  size: {
    width: 20,
    aspectRatio: 1,
  },
})
