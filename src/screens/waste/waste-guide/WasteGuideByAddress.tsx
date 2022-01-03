import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {menuRoutes, MenuStackParams} from '../../../App/navigation'
import {AddressFormTeaser} from '../../../components/features/address'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  TextButton,
  Title,
} from '../../../components/ui'
import {SingleSelectable} from '../../../components/ui/SingleSelectable'
import {Gutter, Row} from '../../../components/ui/layout'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {AddressContext} from '../../../providers'
import {Address} from '../../../types'
import {WasteGuide, WasteGuideResponse, WasteType} from './types'
import {
  transformWasteGuideResponse,
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
  WasteGuideCollectionPoints,
  WasteGuideContainers,
} from './'

export const WasteGuideByAddress = () => {
  const [address, setAddress] = useState<Address | undefined>(undefined)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )
  const addressContext = useContext(AddressContext)
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParams, 'WasteGuide'>>()

  const wasteGuideEndpoint = useFetch<WasteGuideResponse>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  const retrieveAddress = useCallback(async () => {
    const retrievedAddress = await asyncStorage.getValue('address')
    retrievedAddress && setAddress(retrievedAddress)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
  }, [retrieveAddress])

  useEffect(() => {
    setAddress(addressContext.address)
  }, [addressContext.address])

  useEffect(() => {
    wasteGuideEndpoint.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setWasteGuide(transformWasteGuideResponse(wasteGuideEndpoint.data, address))
  }, [address, wasteGuideEndpoint.data])

  useEffect(() => {
    return () => {
      addressContext.changeSaveInStore(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    !address && addressContext && addressContext.changeSaveInStore(false)
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  const wasteGuideLength = wasteGuide && Object.keys(wasteGuide).length

  const navigateToAddressForm = () => {
    addressContext.changeSaveInStore(false)
    navigation.navigate(menuRoutes.addressForm.name)
  }

  if (!address) {
    return (
      <AddressFormTeaser
        text="Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval."
        title="Uw adres"
      />
    )
  }

  return (
    <>
      <Box background="white">
        <SingleSelectable>
          <Text>Afvalinformatie voor</Text>
          <Gutter height="xs" />
          <Title text={address.adres} />
          <Gutter height="sm" />
        </SingleSelectable>
        <Row align="start">
          <TextButton
            direction="backward"
            emphasis
            onPress={navigateToAddressForm}
            text="Verander adres"
          />
        </Row>
      </Box>
      <Box>
        {wasteGuideLength === undefined ? (
          <Card>
            <CardHeader>
              <Title level={4} text="Gegevens ophalen…" />
            </CardHeader>
            <CardBody>
              <ActivityIndicator />
            </CardBody>
          </Card>
        ) : wasteGuideLength === 0 ? (
          <WasteGuideByAddressNoDetails address={address} />
        ) : (
          <>
            {wasteGuide?.[WasteType.Bulky] && (
              <>
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Bulky]!}
                  footerLink={{
                    onPress: () =>
                      navigation.navigate(menuRoutes.whereToPutBulkyWaste.name),
                    text: 'Grof afval: buiten zetten of naar een afvalpunt?',
                  }}
                />
                <Gutter height="md" />
                <WasteGuideCollectionPoints />
              </>
            )}
            {wasteGuide?.[WasteType.Household] && (
              <>
                {wasteGuide[WasteType.Bulky] && <Gutter height="md" />}
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Household]!}
                />
                <Gutter height="md" />
                <WasteGuideContainers />
              </>
            )}
            <Gutter height="md" />
            <TextButton
              direction="forward"
              onPress={() =>
                navigation.navigate(menuRoutes.webView.name, {
                  sliceFromTop: {portrait: 161, landscape: 207},
                  title: 'Melden afvalinformatie',
                  url: 'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/',
                })
              }
              text="Kloppen de dagen of tijden niet?"
            />
          </>
        )}
      </Box>
    </>
  )
}
