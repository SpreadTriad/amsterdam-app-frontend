import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {menuScreenOptions} from '../../../App/navigation/screenOptions'
import {MenuStackParamList} from '../../../App/navigation/types'
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
  TextButton,
  Title,
} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {size} from '../../../tokens'

export const WasteGuideCollectionPoints = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'Waste'>>()

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Afvalpunten" />
      </CardHeader>
      <CardBody>
        <Text>
          Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch afval en{' '}
          spullen voor de kringloop kwijt.
        </Text>
        <Gutter height={size.spacing.md} />
        <Row align="start">
          <TextButton
            direction="forward"
            onPress={() =>
              navigation.navigate(menuScreenOptions.webView.name, {
                sliceFromTop: {portrait: 50, landscape: 50},
                title: 'Afvalpunten in de buurt',
                url: 'https://kaart.amsterdam.nl/#52.2744/4.7151/52.4355/5.0667/brt/9776/244/',
              })
            }
            text="Bekijk de kaart met afvalpunten in de buurt"
          />
        </Row>
        <Gutter height={size.spacing.md} />
        <View style={styles.figure}>
          <Image
            source={require('../../../assets/images/placeholder-map-collection-points.jpg')}
            style={styles.image}
          />
        </View>
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  figure: {
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 638 / 220,
    flexShrink: 1,
  },
})
