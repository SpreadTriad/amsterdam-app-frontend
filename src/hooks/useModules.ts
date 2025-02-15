import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useMemo, useState} from 'react'
// eslint-disable-next-line no-restricted-imports
import {version as releaseVersion} from '@/../package.json'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSentry} from '@/hooks/sentry/useSentry'
import {useAppState} from '@/hooks/useAppState'
import {clientModules} from '@/modules/modules'
import {useGetReleaseQuery} from '@/services/modules.service'
import {
  selectAuthorizedModules,
  selectDisabledModules,
} from '@/store/slices/modules'
import {postProcessModules} from '@/utils/modules'

const MAX_RETRIES = 3

/**
 * Handles the request for the serverside module configuration and returns various postprocessed lists of modules, not including core modules. It also returns the modules disabled by the user, plus the loading/error state of the endpoint and a refetch method.
 */
export const useModules = () => {
  const {
    data: release,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetReleaseQuery(releaseVersion ?? skipToken)
  const serverModules = release?.modules
  const {sendSentryErrorLog} = useSentry()
  const userDisabledModulesBySlug = useSelector(selectDisabledModules)
  const authorizedModulesBySlug = useSelector(
    selectAuthorizedModules,
    (a: string[], b: string[]) =>
      a.length === b.length &&
      a.every((value: string, index) => value === b[index]),
  )
  const [retriesRemaining, setRetriesRemaining] = useState(MAX_RETRIES)
  const postProcessedModules = useMemo(() => {
    if (!serverModules) {
      return
    }

    return postProcessModules(
      clientModules,
      userDisabledModulesBySlug,
      authorizedModulesBySlug,
      serverModules,
    )
  }, [authorizedModulesBySlug, userDisabledModulesBySlug, serverModules])

  useEffect(() => {
    if (error) {
      sendSentryErrorLog('useGetModulesForAppQuery error', 'useModules.ts', {
        error,
        retriesRemaining,
        serverModules,
      })

      if (retriesRemaining > 0) {
        void refetch()
        setRetriesRemaining(v => v - 1)
      }
    } else {
      setRetriesRemaining(MAX_RETRIES)
    }
  }, [
    error,
    isLoading,
    refetch,
    retriesRemaining,
    sendSentryErrorLog,
    serverModules,
  ])

  useAppState({
    onForeground: () => {
      setRetriesRemaining(MAX_RETRIES)
      void refetch()
    },
  })

  // This prevents the situation where an empty modules array is returned when isLoading is false.
  // TODO We should fix this later by handling the async nature of requests in a better way.
  const modulesLoading =
    isLoading ||
    (isSuccess && postProcessedModules?.allModulesDangerous.length === 0)

  return {
    userDisabledModulesBySlug,
    modulesLoading,
    modulesError: error,
    refetchModules: retriesRemaining === 0 ? refetch : undefined,
    ...postProcessedModules,
  }
}
