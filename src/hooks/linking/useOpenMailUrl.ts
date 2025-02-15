import {Alert, Linking} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'

export type OpenMailUrl = (emailAddress: string, subject?: string) => void

export const useOpenMailUrl = (): OpenMailUrl => {
  const {sendSentryErrorLog} = useSentry()

  return (emailAddress: string, subject?: string) => {
    let mailUrl = `mailto:${emailAddress}`

    if (subject) {
      mailUrl += `?subject=${encodeURIComponent(subject)}`
    }

    Linking.openURL(mailUrl).catch(() => {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      sendSentryErrorLog('useOpenMailUrl error', 'useOpenMailUrl.ts', {
        mailUrl,
      })
    })
  }
}
