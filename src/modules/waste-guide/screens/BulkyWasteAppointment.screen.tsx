import {RouteProp} from '@react-navigation/native'
import {WebView} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'

type Props = {
  route?: RouteProp<
    WasteGuideStackParams,
    WasteGuideRouteName.bulkyWasteAppointment
  >
}

export const BulkyWasteAppointmentScreen = ({route}: Props) => (
  <Screen scroll={false}>
    <WebView
      sliceFromTop={{portrait: 162, landscape: 208}}
      url={route?.params?.url ?? ''}
    />
  </Screen>
)
