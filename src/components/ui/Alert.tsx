import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useContext} from 'react'
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {AlertContext} from '../../providers'
import {color, size} from '../../tokens'
import {Row} from './layout'
import {Text, Title} from '.'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Alert = () => {
  const {changeVisibility, content, isVisible, variant} =
    useContext(AlertContext)

  const hideAlert = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
    )
    changeVisibility(false)
  }

  const styles = StyleSheet.create({
    alert: {
      backgroundColor:
        variant === 'success' ? color.status.success : color.status.error,
    },
    inner: {
      padding: size.spacing.md,
    },
    icon: {
      width: 24,
      aspectRatio: 1,
    },
  })

  return (
    <>
      {isVisible ? (
        <View style={[styles.alert]}>
          <View style={styles.inner}>
            <Row align="between">
              <Title inverse text={content?.title!} />
              <TouchableOpacity onPress={hideAlert}>
                <Close fill="white" style={styles.icon} />
              </TouchableOpacity>
            </Row>
            <Text inverse>{content?.text}</Text>
          </View>
        </View>
      ) : null}
    </>
  )
}
