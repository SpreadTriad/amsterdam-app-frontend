import {GeolocationError} from '@react-native-community/geolocation'
import {useCallback, useState} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCurrentPosition} from '@/hooks/useGetCurrentPosition'
import {requestLocationFailedAlertConfig} from '@/modules/address/constants'
import {addCurrentCoordinates} from '@/modules/address/slice'
import {setAlert} from '@/store/slices/alert'

export const useGetCurrentCoordinates = (
  onError?: (error: GeolocationError) => void,
) => {
  const getCurrentPosition = useGetCurrentPosition()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)

  return {
    getCurrentCoordinates: useCallback(() => {
      setPending(true)
      getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          dispatch(addCurrentCoordinates({lat: latitude, lon: longitude}))
          setPending(false)
        },
        error => {
          onError?.(error)
          dispatch(setAlert(requestLocationFailedAlertConfig))
          setPending(false)
        },
      )
    }, [dispatch, getCurrentPosition, onError]),
    pending,
  }
}
