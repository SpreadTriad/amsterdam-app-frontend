import {StackNavigationRoutes} from '@/app/navigation'
import {AboutRouteName, AboutStackParams} from '@/modules/about/routes'
import {
  AboutEnglishScreen,
  AboutScreen,
  AccessibilityStatementScreen,
  AppSummaryScreen,
  PrivacyStatementScreen,
} from '@/modules/about/screens'

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
  [AboutRouteName.aboutEnglish]: {
    component: AboutEnglishScreen,
    name: AboutRouteName.aboutEnglish,
    options: {
      headerTitle: 'Over deze app',
    },
  },
  [AboutRouteName.accessibilityStatement]: {
    component: AccessibilityStatementScreen,
    name: AboutRouteName.accessibilityStatement,
    options: {
      headerTitle: 'Over deze app',
    },
  },
  [AboutRouteName.appSummary]: {
    component: AppSummaryScreen,
    name: AboutRouteName.appSummary,
    options: {
      headerTitle: 'Waarom deze app?',
    },
  },
  [AboutRouteName.privacyStatement]: {
    component: PrivacyStatementScreen,
    name: AboutRouteName.privacyStatement,
    options: {
      headerTitle: 'Over deze app',
    },
  },
}
