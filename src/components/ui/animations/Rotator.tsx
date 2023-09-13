import {ReactNode, useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import {Row} from '@/components/ui/layout/Row'

type Props = {
  children?: ReactNode
}

/**
 * Indicates activity, often while performing network tasks.
 * Best used through `PleaseWait` rather than by itself.
 */
export const Rotator = ({children}: Props) => {
  const rotationRef = useRef(new Animated.Value(0))

  useEffect(() => {
    const {start, stop} = Animated.loop(
      Animated.timing(rotationRef.current, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )

    start()

    return stop
  }, [])

  return (
    <Row align="center">
      <Animated.View
        accessibilityLabel="Bezig …"
        accessible
        style={[
          {
            transform: [
              {
                rotate: rotationRef.current.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}>
        {children}
      </Animated.View>
    </Row>
  )
}
