import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {WebView} from '@/components/ui'

export const MakeAppointmentScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Maak een afspraak',
    })
  }, [navigation])

  return (
    <WebView
      sliceFromTop={{portrait: 162, landscape: 208}}
      url="https://www.amsterdam.nl/contact/afspraak-maken-stadsloket/"
    />
  )
}
