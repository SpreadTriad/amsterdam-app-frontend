import React, {ReactNode, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useInitSentry, useRegisterDevice, useSentry} from '@/hooks'
import {useAppState} from '@/hooks/useAppState'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {getPushNotificationsPermission} from '@/processes'
import {setCredentials} from '@/store'
import {encryptWithAES} from '@/utils'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const dispatch = useDispatch()
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  useInitSentry()
  const {sendSentryErrorLog} = useSentry()
  const {registerDevice} = useRegisterDevice()

  useAppState({
    onForeground: () => {
      getPushNotificationsPermission()
        .then(registerDevice)
        .catch((error: unknown) => {
          sendSentryErrorLog(
            'Register device for push notifications failed',
            'Init.tsx',
            {error},
          )
        })
    },
  })

  useEffect(() => {
    if (constructionWorkEditorId) {
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: constructionWorkEditorId,
          }),
        }),
      )
    }
  }, [dispatch, constructionWorkEditorId])

  return <>{children}</>
}
