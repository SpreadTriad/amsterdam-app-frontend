import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode, useContext} from 'react'
import {DescriptionList} from '@/components/ui'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {WasteGuideDetails} from '@/modules/waste-guide/types'
import {DeviceContext} from '@/providers'

type Props = {
  details: WasteGuideDetails
  footerLink?: {
    text: string
    onPress: () => void
  }
  illustration?: ReactNode
}

export const WasteGuideByAddressDetails = ({
  details,
  footerLink,
  illustration,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  const {appointmentUrl, collectionDays, howToOffer, remark, whenToPutOut} =
    details

  return (
    <Track gutter="md">
      {!!illustration && (
        <Column>
          <Figure height={192}>{illustration}</Figure>
        </Column>
      )}
      <Column gutter="md">
        {appointmentUrl ? (
          <>
            <Paragraph>
              Maak een afspraak, dan komen we het grof afval bij u ophalen.
            </Paragraph>
            <Button
              accessibilityRole="link"
              label="Haal mijn grof afval op"
              onPress={() =>
                navigation.navigate(WasteGuideRouteName.bulkyWasteAppointment, {
                  appointmentUrl,
                })
              }
            />
          </>
        ) : (
          <DescriptionList
            items={[
              {
                label: 'Hoe',
                value: howToOffer,
              },
              {
                label: collectionDays?.includes(' en ')
                  ? 'Ophaaldagen'
                  : 'Ophaaldag',
                value: collectionDays,
              },
              {
                label: 'Buiten zetten',
                value: whenToPutOut,
              },
              {
                label: 'Opmerking',
                value: remark,
              },
            ]}
          />
        )}
        {!!footerLink && (
          <NavigationButton
            label={footerLink.text}
            onPress={footerLink.onPress}
          />
        )}
      </Column>
    </Track>
  )
}
