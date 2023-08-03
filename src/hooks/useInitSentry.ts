import NetInfo from '@react-native-community/netinfo'
import {useEffect} from 'react'
import {useSentry} from '@/hooks/useSentry'
import {
  initSentry,
  setSentryBackEndEnvironment,
  setSentryUserData,
} from '@/processes/sentry'
import {useAppSelector} from '@/store/hooks'
import {BreadcrumbCategory} from '@/types/sentry'

/**
 * Initialize Sentry and related listeners and side effects
 */
export const useInitSentry = () => {
  const environment = useAppSelector(state => state.environment.environment)
  const {captureSentryBreadcrumb} = useSentry()

  // TODO When we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting.
  const consent = true

  useEffect(() => {
    initSentry()
  }, [])

  useEffect(() => {
    setSentryUserData(consent)
  }, [consent])

  useEffect(
    () =>
      NetInfo.addEventListener(({isConnected, isInternetReachable}) => {
        captureSentryBreadcrumb(
          'Internet connection change',
          {isConnected, isInternetReachable},
          BreadcrumbCategory.internetConnection,
        )
      }),
    [captureSentryBreadcrumb],
  )

  useEffect(() => {
    setSentryBackEndEnvironment(environment)
  }, [environment])
}
