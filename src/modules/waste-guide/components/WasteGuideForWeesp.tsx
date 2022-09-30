import ExternalLink from '@amsterdam/asc-assets/static/icons/ExternalLink.svg'
import {Address} from '_modules/address'
import React from 'react'
import {Linking} from 'react-native'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'

type Props = {
  address: Address
}

export const WasteGuideForWeesp = ({address}: Props) => {
  const gadUrl =
    'https://inzamelkalender.gad.nl/adres/' +
    [address.postcode, address.huisnummer, address.bag_toevoeging].join(':')

  return (
    <Box>
      <Column gutter="md">
        <Paragraph>
          In Weesp haalt de GAD het afval op. Kijk op hun website hoe dat werkt.
        </Paragraph>
      </Column>
      <Gutter height="lg" />
      <Row align="start">
        <Button
          accessibilityRole="link"
          icon={ExternalLink}
          label="Ga naar GAD.nl"
          onPress={() => {
            // eslint-disable-next-line no-void
            void Linking.openURL(gadUrl)
          }}
        />
      </Row>
    </Box>
  )
}
