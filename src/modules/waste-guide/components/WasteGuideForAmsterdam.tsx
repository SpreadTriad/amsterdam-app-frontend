import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useMemo} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Accordion, Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {Address} from '@/modules/address'
import {module as wasteGuideModule} from '@/modules/waste-guide'
import {
  BulkyWasteAtRoadsideImage,
  BulkyWasteByCarImage,
  HouseHoldWasteAtRoadsideImage,
  HouseholdWasteToContainerImage,
  PlayingNearContainersImage,
} from '@/modules/waste-guide/assets/images'
import {
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
} from '@/modules/waste-guide/components'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {WasteType} from '@/modules/waste-guide/types'
import {transformWasteGuideResponse} from '@/modules/waste-guide/utils'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'

type Props = {
  address: Address
}

export const WasteGuideForAmsterdam = ({address}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  const {data, isLoading} = useGetGarbageCollectionAreaQuery(
    {
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    },
    {skip: !address},
  )

  const environment = useEnvironment()

  const wasteGuide = useMemo(
    () => data && transformWasteGuideResponse(data, address, environment),
    [address, data, environment],
  )

  const wasteGuideLength = wasteGuide && Object.keys(wasteGuide).length

  if (isLoading) {
    return <PleaseWait />
  }

  const addressCoordinates = {
    lon: address.centroid[1],
    lat: address.centroid[0],
  }

  return (
    <Column grow>
      {wasteGuideLength === undefined ? (
        <Box>
          <Title level="h4" text="Gegevens ophalen …" />
          <PleaseWait />
        </Box>
      ) : wasteGuideLength === 0 ? (
        <WasteGuideByAddressNoDetails />
      ) : (
        <Column>
          <Box insetHorizontal="md">
            {wasteGuide?.[WasteType.Bulky] && (
              <Accordion title={wasteGuide[WasteType.Bulky]?.title ?? ''}>
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Bulky]}
                  footerLink={{
                    onPress: () =>
                      navigation.navigate(
                        WasteGuideRouteName.whereToPutBulkyWaste,
                      ),
                    text: 'Grof afval: buiten zetten of naar een Afvalpunt?',
                  }}
                  illustration={<BulkyWasteAtRoadsideImage />}
                />
              </Accordion>
            )}
            {wasteGuide?.[WasteType.Household] && (
              <Accordion title={wasteGuide[WasteType.Household]?.title ?? ''}>
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Household]}
                  illustration={
                    wasteGuide[WasteType.Household]?.howToOffer?.includes(
                      'container',
                    ) ? (
                      <HouseholdWasteToContainerImage />
                    ) : (
                      <HouseHoldWasteAtRoadsideImage />
                    )
                  }
                />
              </Accordion>
            )}
            <Accordion title="Containers in de buurt">
              <Track gutter={isLandscape ? 'xl' : 'md'} reverse={isLandscape}>
                <Figure height={192}>
                  <PlayingNearContainersImage />
                </Figure>
                <Column gutter="md">
                  <Paragraph>
                    Zoekt u een container voor glas, papier, textiel, plastic
                    verpakkingen of restafval?
                  </Paragraph>
                  <Button
                    label="Bekijk containers in de buurt"
                    onPress={() =>
                      navigation.navigate(
                        WasteGuideRouteName.wasteGuideContainers,
                        addressCoordinates,
                      )
                    }
                    variant="secondary"
                  />
                </Column>
              </Track>
            </Accordion>
            <Accordion title="Afvalpunten">
              <Track gutter={isLandscape ? 'xl' : 'md'} reverse={isLandscape}>
                <Figure height={192}>
                  <BulkyWasteByCarImage />
                </Figure>
                <Column gutter="md">
                  <Paragraph>
                    Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch
                    afval en spullen voor de kringloop kwijt.
                  </Paragraph>
                  <Button
                    label="Bekijk Afvalpunten op de kaart"
                    onPress={() =>
                      navigation.navigate(
                        WasteGuideRouteName.wasteGuideCollectionPoints,
                        addressCoordinates,
                      )
                    }
                    variant="secondary"
                  />
                </Column>
              </Track>
            </Accordion>
          </Box>
        </Column>
      )}
    </Column>
  )
}
