import React, {ReactNode, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRegisterDevice, useInitSentry, useSentry} from '@/hooks'
import {useAppState} from '@/hooks/useAppState'
import {selectProjectManager} from '@/modules/construction-work/components/project-manager'
import {getPushNotificationsPermission} from '@/processes'
import {setCredentials} from '@/store'
import {encryptWithAES} from '@/utils'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const dispatch = useDispatch()
  const {id: projectManagerId} = useSelector(selectProjectManager)
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
    if (projectManagerId) {
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: projectManagerId,
          }),
        }),
      )
    }
  }, [dispatch, projectManagerId])

  return <>{children}</>
}
