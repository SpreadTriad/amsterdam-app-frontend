import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import {RouteProp} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {MenuStackParams} from '../App/navigation'
import HeroImage from '../assets/images/warning-hero.svg'
import {Box, Button, PleaseWait, Text, Title} from '../components/ui'
import {Row, ScrollView} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {color} from '../tokens'
import {Warning} from '../types'
import {formatDate, openMailUrl} from '../utils'

type ProjectWarningScreenRouteProp = RouteProp<
  MenuStackParams,
  'ProjectWarning'
>

type Props = {
  route: ProjectWarningScreenRouteProp
}

export const ProjectWarningScreen = ({route}: Props) => {
  const [warning, setWarning] = useState<Warning | undefined>()

  const api = useFetch<Warning>({
    url: getEnvironment().apiUrl + '/project/warning',
    options: {
      params: {
        id: route.params.id,
      },
    },
  })

  useEffect(() => {
    if (api.data) {
      setWarning(api.data)
    }
  }, [api.data])

  return warning ? (
    <ScrollView>
      <View style={styles.image}>
        <HeroImage />
      </View>
      <Box background="white">
        <Text margin secondary>
          {formatDate(warning.publication_date)}
        </Text>
        <Title margin text={warning.title} />
        <Text intro margin>
          {warning.body.preface}
        </Text>
        <Text margin>{warning.body.content}</Text>
      </Box>
      <Box>
        <Box background="white">
          <Row>
            <Button
              icon={<Email fill={color.font.inverse} />}
              onPress={() => openMailUrl(warning.author_email)}
              text={warning.author_email}
            />
          </Row>
        </Box>
      </Box>
    </ScrollView>
  ) : (
    <PleaseWait />
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 378 / 167,
  },
})
