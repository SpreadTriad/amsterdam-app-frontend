import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {AddressForm} from '../../../components/features/AddressForm'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Link,
  Text,
  Title,
} from '../../../components/ui'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {size} from '../../../tokens'
import {Address} from '../../../types/address'
import {WasteGuideByAddressDetails} from '../index'
import {WasteGuide, WasteGuideResponse, WasteType} from './types'
import {transformWasteGuideResponse} from './utils/transformWasteGuideResponse'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WebView'>
}

export const WasteGuideByAddress = ({navigation}: Props) => {
  const [address, setAddress] = useState<Address | undefined>(undefined)
  const [isAddressRetrieving, setIsAddressRetrieving] = useState(true)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )

  const asyncStorage = useAsyncStorage()

  const retrieveAddress = useCallback(async () => {
    const retrievedAddress = await asyncStorage.getData('address')
    setAddress(retrievedAddress)
    setIsAddressRetrieving(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
  }, [retrieveAddress])

  const api = useFetch<WasteGuideResponse>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  useEffect(() => {
    api.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setWasteGuide(transformWasteGuideResponse(api.data, address))
  }, [address, api.data])

  const hasWasteGuideDetails = wasteGuide && Object.keys(wasteGuide).length

  if (isAddressRetrieving) {
    return null
  }

  return address ? (
    <>
      <Box background="lighter">
        <Text>Afvalinformatie voor</Text>
        <Title text={address.adres} />
        <Link
          direction="backward"
          onPress={() => setAddress(undefined)}
          text="Verander adres"
        />
      </Box>
      <Box background="light">
        {api.isLoading ? (
          <Card>
            <CardHeader>
              <Title level={4} text="Gegevens ophalen…" />
            </CardHeader>
            <CardBody>
              <ActivityIndicator />
            </CardBody>
          </Card>
        ) : hasWasteGuideDetails ? (
          <>
            {wasteGuide?.[WasteType.Bulky] && (
              <WasteGuideByAddressDetails
                details={wasteGuide[WasteType.Bulky]!}
              />
            )}
            {wasteGuide?.[WasteType.Household] && (
              <>
                {wasteGuide[WasteType.Bulky] && (
                  <Gutter height={size.spacing.md} />
                )}
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Household]!}
                />
              </>
            )}
          </>
        ) : (
          <Box background="lighter">
            <Text>
              Geen afvalinformatie gevonden voor {address.adres},{' '}
              {address.postcode} {address.woonplaats}.
            </Text>
            <Gutter height={size.spacing.md} />
            <Link
              direction="forward"
              emphasis
              onPress={() =>
                navigation.navigate(routes.webView.name, {
                  title: 'Melding afvalinformatie op adres',
                  uri: 'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/',
                })
              }
              text="Hier klopt iets niet"
            />
            <Gutter height={size.spacing.md} />
            <View style={styles.alignLeft}>
              <Button
                onPress={() =>
                  navigation.navigate(routes.webView.name, {
                    title: 'Melding afvalinformatie',
                    uri: 'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/',
                  })
                }
                text="Hier klopt iets niet"
                variant="secondary"
              />
            </View>
          </Box>
        )}
      </Box>
    </>
  ) : (
    <Box background="lighter">
      <Title level={2} text="Uw adres" />
      <Text>
        Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval.
      </Text>
      <Gutter height={size.spacing.md} />
      <AddressForm onSubmit={setAddress} />
    </Box>
  )
}

const styles = StyleSheet.create({
  alignLeft: {
    alignItems: 'flex-start',
  },
})
