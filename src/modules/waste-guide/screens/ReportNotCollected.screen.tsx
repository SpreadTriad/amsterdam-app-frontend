import React from 'react'
import {useSelector} from 'react-redux'
import {WebView} from '@/components/ui'
import {selectAddress} from '@/modules/address/addressSlice'
import {useEnvironment} from '@/store'

export const ReportNotCollectedScreen = () => {
  const {primary: address} = useSelector(selectAddress)
  const environment = useEnvironment()
  return (
    <WebView
      url={`${environment.signalsBaseUrl}/categorie/afval/grofvuil`}
      urlParams={{
        lat: address?.centroid[1] ?? 0,
        lng: address?.centroid[0] ?? 0,
      }}
    />
  )
}
