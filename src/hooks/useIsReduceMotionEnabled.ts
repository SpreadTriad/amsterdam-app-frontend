import {useState, useEffect} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useAppState} from '@/hooks/useAppState'

type Options = {
  callback?: (isReduceMotionEnabled: boolean) => void
  callbackAfterAppStateChange?: boolean
}

export const useIsReduceMotionEnabled = (
  {callback, callbackAfterAppStateChange = true}: Options = {},
  deps: React.DependencyList | undefined = [],
) => {
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState<
    boolean | undefined
  >(undefined)

  useAppState({
    onForeground: () => {
      void AccessibilityInfo.isReduceMotionEnabled().then(value => {
        setIsReduceMotionEnabled(value)
        if (callbackAfterAppStateChange) {
          callback?.(value)
        }
      })
    },
  })
  useEffect(() => {
    void AccessibilityInfo.isReduceMotionEnabled().then(value => {
      setIsReduceMotionEnabled(value)
      callback?.(value)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return isReduceMotionEnabled
}
