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

export const WasteGuideContainers = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'Waste'>>()

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Containers in de buurt" />
      </CardHeader>
      <CardBody>
        <Text>
          Zoekt u een container voor glas, papier, textiel, plastic verpakkingen
          of restafval?
        </Text>
        <Gutter height={size.spacing.md} />
        <Row align="start">
          <TextButton
            direction="forward"
            onPress={() =>
              navigation.navigate(menuScreenOptions.webView.name, {
                sliceFromTop: {portrait: 50, landscape: 50},
                title: 'Containers in de buurt',
                url: 'https://kaart.amsterdam.nl/afvalcontainers#17/52.36306/4.90720/brt/12491,12492,12493,12494,12495,12496,12497//',
              })
            }
            text="Bekijk de kaart met containers in de buurt"
          />
        </Row>
        <Gutter height={size.spacing.md} />
        <View style={styles.figure}>
          <Image
            source={require('../../../assets/images/placeholder-map-containers.jpg')}
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
    aspectRatio: 632 / 220,
    flexShrink: 1,
  },
})
