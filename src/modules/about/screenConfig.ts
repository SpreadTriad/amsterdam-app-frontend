import {StackNavigationRoutes} from '@/app/navigation/types'
import {AboutRouteName, AboutStackParams} from '@/modules/about/routes'
import {AboutScreen} from '@/modules/about/screens/About.screen'
import {AboutTheAppDutchScreen} from '@/modules/about/screens/AboutTheAppDutch.screen'
import {AboutTheAppEnglishScreen} from '@/modules/about/screens/AboutTheAppEnglish.screen'
import {AccessibilityStatementScreen} from '@/modules/about/screens/AccessibilityStatement.screen'
import {PrivacyStatementScreen} from '@/modules/about/screens/PrivacyStatement.screen'

export const screenConfig: StackNavigationRoutes<
  AboutStackParams,
  AboutRouteName
> = {
  [AboutRouteName.about]: {
    component: AboutScreen,
    name: AboutRouteName.about,
    options: {
      headerTitle: 'Over deze app',
    },
  },
  [AboutRouteName.appSummary]: {
    component: AboutTheAppDutchScreen,
    name: AboutRouteName.appSummary,
    options: {
      headerTitle: 'Waarom deze app?',
    },
  },
  [AboutRouteName.aboutEnglish]: {
    component: AboutTheAppEnglishScreen,
    name: AboutRouteName.aboutEnglish,
    options: {
      accessibilityLanguage: 'en-US',
      headerTitle: 'About this app',
    },
  },
  [AboutRouteName.accessibilityStatement]: {
    component: AccessibilityStatementScreen,
    name: AboutRouteName.accessibilityStatement,
    options: {
      headerTitle: 'Toegankelijkheidsverklaring',
    },
  },
  [AboutRouteName.privacyStatement]: {
    component: PrivacyStatementScreen,
    name: AboutRouteName.privacyStatement,
    options: {
      headerTitle: 'Privacyverklaring',
    },
  },
}
