import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {AddressForm} from '../../components/features/AddressForm'
import {
  Box,
  Button,
  Card,
  CardBody,
  Gutter,
  Text,
  Title,
} from '../../components/ui'
import {useAsyncStorage} from '../../hooks/useAsyncStorage'
import {useFetch} from '../../hooks/useFetch'
import {size} from '../../tokens'
import {Address} from '../../types/address'
import {
  WasteGuideCollectionPoints,
  WasteGuideContainers,
  WasteGuideForBulkyWaste,
  WasteGuideForHouseholdWaste,
} from './'

export type WasteGuide = {
  features: WasteGuideFeature[]
  type: string
}

export type WasteGuideFeature = {
  properties: {
    aanbiedwijze: string
    dataset: string
    frequentie: string
    mutatie: string
    ophaaldag: string
    ophalen: string
    opmerking: string
    stadsdeel_code: string
    stadsdeel_id: string
    stadsdeel_naam: string
    tijd_tot: string
    tijd_vanaf: string
    type: string
    website: string
  }
}

export const WasteGuideByAddress = () => {
  const [address, setAddress] = useState<Address | null | undefined>(undefined)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )

  const asyncStorage = useAsyncStorage()

  const retrieveAddress = useCallback(async () => {
    const addressFromStore = await asyncStorage.getData('address')
    setAddress(addressFromStore)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
  }, [retrieveAddress])

  const api = useFetch<WasteGuide>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    api.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address])

  useEffect(() => {
    setWasteGuide(api.data ?? undefined)
  }, [api.data])

  // TODO Transform to minimal format, combining into one object
  const bulkyWaste = wasteGuide?.features?.length
    ? wasteGuide.features.find(f => f.properties.dataset === 'grofvuil')
        ?.properties
    : null

  const householdWaste = wasteGuide?.features?.length
    ? wasteGuide.features.find(f => f.properties.dataset === 'huisvuil')
        ?.properties
    : null

  return (
    <>
      <Box background="lighter">
        {address ? (
          <Card>
            <CardBody centerContent>
              <Text secondary>Uw adres is:</Text>
              <Gutter height={size.spacing.md} />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
              <Button
                onPress={() => setAddress(null)}
                text="Verander adres"
                variant="text"
              />
            </CardBody>
          </Card>
        ) : (
          <>
            <Title level={2} text="Uw adres" />
            <Text>
              Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw
              afval.
            </Text>
            <Gutter height={size.spacing.md} />
            <AddressForm onSubmit={setAddress} />
          </>
        )}
      </Box>
      {(api.isLoading || bulkyWaste || householdWaste) && (
        <Box>
          {api.isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {bulkyWaste && (
                <>
                  <WasteGuideForBulkyWaste properties={bulkyWaste} />
                  <Gutter height={size.spacing.md} />
                  <WasteGuideCollectionPoints />
                </>
              )}
              {householdWaste && (
                <>
                  {bulkyWaste && <Gutter height={size.spacing.md} />}
                  <WasteGuideForHouseholdWaste properties={householdWaste} />
                  <Gutter height={size.spacing.md} />
                  <WasteGuideContainers />
                </>
              )}
              <>
                <Gutter height={size.spacing.md} />
                <Title
                  level={4}
                  text="&gt; Bekijk de kaart met afvalpunten in de buurt"
                />
              </>
            </>
          )}
        </Box>
      )}
    </>
  )
}
