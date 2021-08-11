import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, useWindowDimensions, View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {Easing} from 'react-native-reanimated'
import RenderHTML from 'react-native-render-html'
import {TimelineItem as TimelineItemType} from '../../../data/timeline'
import {tagsStyles} from '../../../styles/html'
import {color, font} from '../../../tokens'
import {Title} from '../Title'
import {STYLE, timelineStyles} from './timelineStyles'

type Props = {
  isFirst?: boolean
  isLast?: boolean
  item: TimelineItemType
}

export const TimelineItem = ({isFirst, isLast, item}: Props) => {
  const {width} = useWindowDimensions()
  const isCurrent = item.status === 'current'
  const [expanded, setExpanded] = useState(isCurrent)

  const chevronProps = {fill: color.background.darker, height: 9, width: 14}
  const fadeAnim = useRef(new Animated.Value(0)).current
  const styles = timelineStyles(isCurrent, isFirst, isLast)

  useLayoutEffect(() => {
    if (isCurrent) {
      fadeAnim.setValue(STYLE.CONTENT.MAX_HEIGHT)
    }
  }, [fadeAnim, isCurrent])

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        easing: Easing.bezier(0, 1, 0, 1),
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: STYLE.CONTENT.MAX_HEIGHT,
        useNativeDriver: false,
      }).start()
    }
    setExpanded(!expanded)
  }

  return (
    <View style={styles.section}>
      <TouchableWithoutFeedback
        onPress={toggleExpand}
        style={styles.heading}
        accessible={true}
        accessibilityRole="button">
        <View style={styles.indicator}>
          {item.status === 'finished' && (
            <Checkmark fill={color.background.light} height={11} width={14} />
          )}
        </View>
        <View style={styles.title}>
          <Title level={4} margin text={item.title} />
        </View>
        {expanded ? (
          <ChevronUp {...chevronProps} />
        ) : (
          <ChevronDown {...chevronProps} />
        )}
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.content, {maxHeight: fadeAnim}]}>
        <RenderHTML
          contentWidth={width}
          source={{html: item.content}}
          systemFonts={[font.weight.regular]}
          tagsStyles={tagsStyles}
        />
      </Animated.View>
      <View style={styles.line} />
    </View>
  )
}
