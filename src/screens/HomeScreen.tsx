import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../App'
import {Box, Button, Gutter, ScreenWrapper} from '../components/ui'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WebView'>
}

export const HomeScreen = ({navigation}: Props) => {
  return (
    <ScreenWrapper>
      <Box inset="xl">
        <Button
          onPress={() =>
            navigation.navigate(routes.webView.name, {
              uri: 'https://acc.meldingen.amsterdam.nl/',
            })
          }
          text="Maak een melding"
        />
        <Gutter height={size.spacing.md} />
        <Button
          onPress={() => navigation.navigate(routes.projectOverview.name)}
          text="Bekijk bouwprojecten"
        />
        <Gutter height={size.spacing.md} />
        <Button
          onPress={() => navigation.navigate(routes.wasteGuide.name)}
          text="Raadpleeg de afvalwijzer"
        />
        <Gutter height={size.spacing.md} />
        <Button
          onPress={() => navigation.navigate(routes.onboarding.name)}
          text="Vul uw adres in"
        />
      </Box>
    </ScreenWrapper>
  )
}
