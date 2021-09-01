import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Gutter,
  Title,
} from '../../components/ui'
import {size} from '../../tokens'
import {formatSentence} from '../../utils'
import {WasteGuideDetails} from './WasteGuideByAddress'

type Props = {
  details: WasteGuideDetails
}

export const WasteGuideForBulkyWaste = ({details}: Props) => {
  const {appointmentUrl, collectionDays, remark, whenToPutOut} = details

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Grof afval" />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: collectionDays.includes(' en ')
                ? 'Ophaaldagen'
                : 'Ophaaldag',
              value: collectionDays && formatSentence(collectionDays),
            },
            {
              label: 'Buiten zetten',
              value: whenToPutOut,
            },
            {
              label: 'Opmerking',
              value: remark && formatSentence(remark),
            },
          ]}
        />
        {appointmentUrl && (
          <View style={styles.alignLeft}>
            <Gutter height={size.spacing.md} />
            <Button
              onPress={() => Linking.openURL(appointmentUrl)}
              text="Maak een afspraak"
            />
          </View>
        )}
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  alignLeft: {
    alignItems: 'flex-start',
  },
})
