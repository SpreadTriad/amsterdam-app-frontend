import AsyncStorage from '@react-native-async-storage/async-storage'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Address} from '../components/features/address'
import {Box, Button, Column, Gutter} from '../components/ui'
import {getEnvironment} from '../environment'
import {AddressContext, OrientationContext} from '../providers'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: Props) => {
  const orientationContext = useContext(OrientationContext)
  const addressContext = useContext(AddressContext)

  const clearAddress = async () => {
    try {
      await AsyncStorage.removeItem('address')
      addressContext.changeAddress(undefined)
    } catch (e) {}

    console.log('Adres verwijderd.')
  }

  return (
    <ScrollView>
      <Box>
        <View
          style={
            orientationContext.isLandscape && [styles.row, styles.alignStart]
          }>
          <View style={orientationContext.isLandscape && styles.halfWidth}>
            <Address />
          </View>
          <Gutter
            height={orientationContext.isPortrait ? size.spacing.xl : undefined}
            width={orientationContext.isPortrait ? undefined : size.spacing.xl}
          />
          <View
            style={[
              styles.halfWidth,
              orientationContext.isLandscape && styles.alignStart,
            ]}>
            <Column gutter="md">
              <Button
                onPress={() =>
                  navigation.navigate(routes.webView.name, {
                    sliceFromTop: {portrait: 53, landscape: 159},
                    title: 'Melding',
                    uri: 'https://acc.meldingen.amsterdam.nl/',
                  })
                }
                text="Maak een melding"
              />
              <Button
                onPress={() => navigation.navigate(routes.projectOverview.name)}
                text="Bekijk werkzaamheden"
              />
              <Button
                onPress={() => navigation.navigate(routes.wasteGuide.name)}
                text="Raadpleeg afvalinformatie"
              />
              <Button
                onPress={() =>
                  navigation.navigate(routes.notificationOverview.name)
                }
                text="Controleer notificaties"
              />
              {getEnvironment().allowClearingAddress && (
                <Button
                  variant="secondary"
                  onPress={clearAddress}
                  text="Verwijder adres"
                />
              )}
            </Column>
          </View>
        </View>
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  alignStart: {
    alignItems: 'flex-start',
  },
  halfWidth: {
    flexBasis: '50%',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
  },
})
