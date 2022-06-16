import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, Easing, View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {
  maxHeight,
  timelineStyles,
} from '@/components/ui/Timeline/timelineStyles'
import {Title} from '@/components/ui/Title'
import {Icon} from '@/components/ui/media'
import {Article} from '@/components/ui/typography'
import {color} from '@/tokens'
import {TimelineItem as TimelineItemType} from '@/types'

type Props = {
  isFirst?: boolean
  isLast?: boolean
  item: TimelineItemType
}

export const TimelineItem = ({isFirst, isLast, item}: Props) => {
  const isCurrent = item.progress === 'Huidig'
  const [expanded, setExpanded] = useState(isCurrent)

  const chevronProps = {fill: color.background.darker, height: 9, width: 14}
  const fadeAnim = useRef(new Animated.Value(0)).current
  const styles = timelineStyles(isCurrent, isFirst, isLast)

  useLayoutEffect(() => {
    if (isCurrent) {
      fadeAnim.setValue(maxHeight)
    }
  }, [fadeAnim, isCurrent])

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(fadeAnim, {
        easing: Easing.bezier(0, 1, 0, 1),
        toValue: 0,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: maxHeight,
        useNativeDriver: false,
      }).start()
    }
    setExpanded(!expanded)
  }

  return (
    <View style={styles.item}>
      <TouchableWithoutFeedback
        accessible={true}
        accessibilityRole="button"
        onPress={toggleExpand}
        style={styles.header}>
        <View style={styles.indicator}>
          {item.progress === 'Afgelopen' && (
            <Icon size={16}>
              <Checkmark fill={color.border.default} />
            </Icon>
          )}
        </View>
        <View style={styles.title}>
          <Title level={4} margin text={item.title.text} />
        </View>
        {expanded ? (
          <ChevronUp {...chevronProps} />
        ) : (
          <ChevronDown {...chevronProps} />
        )}
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.body, {maxHeight: fadeAnim}]}>
        <Article content={item.content.html} />
      </Animated.View>
      <View style={styles.line} />
    </View>
  )
}
