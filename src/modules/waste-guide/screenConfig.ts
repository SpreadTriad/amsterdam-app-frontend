import {StackNavigationRoutes} from '@/app/navigation'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {
  BulkyWasteAppointmentScreen,
  RecyclingGuideScreen,
  ReportNotCollectedScreen,
  WasteGuideCollectionPointsScreen,
  WasteGuideContainersScreen,
  WasteGuideFeedbackScreen,
  WasteGuideScreen,
  WhereToPutBulkyWasteScreen,
} from '@/modules/waste-guide/screens'

export const wasteGuideScreenConfig: StackNavigationRoutes<
  WasteGuideStackParams,
  WasteGuideRouteName
> = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {
    component: BulkyWasteAppointmentScreen,
    name: WasteGuideRouteName.bulkyWasteAppointment,
    options: {
      headerTitle: 'Afspraak grof afval ophalen',
    },
  },
  [WasteGuideRouteName.recyclingGuide]: {
    component: RecyclingGuideScreen,
    name: WasteGuideRouteName.recyclingGuide,
    options: {
      headerTitle: 'Afvalscheidingswijzer',
    },
  },
  [WasteGuideRouteName.reportNotCollected]: {
    component: ReportNotCollectedScreen,
    name: WasteGuideRouteName.reportNotCollected,
    options: {
      headerTitle: 'Melding doen',
    },
  },
  [WasteGuideRouteName.wasteGuide]: {
    component: WasteGuideScreen,
    name: WasteGuideRouteName.wasteGuide,
    options: {
      headerTitle: 'Afvalwijzer',
    },
  },
  [WasteGuideRouteName.wasteGuideFeedback]: {
    component: WasteGuideFeedbackScreen,
    name: WasteGuideRouteName.wasteGuideFeedback,
    options: {
      headerTitle: 'Melding afvalinformatie doen',
    },
  },
  [WasteGuideRouteName.wasteGuideCollectionPoints]: {
    component: WasteGuideCollectionPointsScreen,
    name: WasteGuideRouteName.wasteGuideCollectionPoints,
    options: {
      headerTitle: 'Afvalpunten in de buurt',
    },
  },
  [WasteGuideRouteName.wasteGuideContainers]: {
    component: WasteGuideContainersScreen,
    name: WasteGuideRouteName.wasteGuideContainers,
    options: {
      headerTitle: 'Containers in de buurt',
    },
  },
  [WasteGuideRouteName.whereToPutBulkyWaste]: {
    component: WhereToPutBulkyWasteScreen,
    name: WasteGuideRouteName.whereToPutBulkyWaste,
    options: {
      headerTitle: 'Grof afval',
    },
  },
}
