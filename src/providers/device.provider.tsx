import React, {createContext, useEffect, useState} from 'react'
import {ScaledSize, useWindowDimensions} from 'react-native'

type Device = {
  isLandscape: boolean | undefined
  isPortrait: boolean | undefined
} & ScaledSize

const initialValue: Device = {
  fontScale: 0,
  height: 0,
  isLandscape: undefined,
  isPortrait: undefined,
  scale: 0,
  width: 0,
}

export const DeviceContext = createContext(initialValue)

type Props = {
  children: React.ReactNode
}

export const DeviceProvider = ({children}: Props) => {
  const [value, setValue] = useState(initialValue)
  const window = useWindowDimensions()

  useEffect(() => {
    setValue({
      isLandscape: window.height < window.width,
      isPortrait: window.height >= window.width,
      ...window,
    })
  }, [window])

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  )
}
