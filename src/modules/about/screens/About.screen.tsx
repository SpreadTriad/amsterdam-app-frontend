import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation/types'
import {NavigationButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Phrase, Title} from '@/components/ui/text'
import {TwoPersonsHighFiveImage} from '@/modules/about/assets/images'
import {AboutRouteName} from '@/modules/about/routes'
import {getVersionNumber} from '@/modules/about/utils'
import {DeviceContext} from '@/providers'

type Props = {
  navigation: StackNavigationProp<RootStackParams, AboutRouteName.about>
}

const versionNumber = getVersionNumber()

export const AboutScreen = ({navigation}: Props) => {
  const {isPortrait} = useContext(DeviceContext)
  const Track = isPortrait ? Column : Row

  return (
    <Screen testID="AboutScreen">
      <Box grow>
        <Track
          align="between"
          grow
          gutter="xl">
          <Column
            flex={1}
            gutter="md">
            <>
              <Title
                testID="AboutAmsterdamAppTitle"
                text="Amsterdam App"
              />
              <Phrase testID="AboutVersionNumberText">
                Versie {versionNumber}
              </Phrase>
            </>
            <Column gutter="sm">
              <NavigationButton
                accessibilityRole="button"
                label="Waarom deze app?"
                onPress={() => navigation.navigate(AboutRouteName.appSummary)}
                testID="AboutAboutTheAppDutchButton"
              />
              <NavigationButton
                accessibilityRole="button"
                label="About this app"
                onPress={() => navigation.navigate(AboutRouteName.aboutEnglish)}
                testID="AboutAboutTheAppEnglishButton"
              />
              <NavigationButton
                accessibilityRole="button"
                label="Privacyverklaring"
                onPress={() =>
                  navigation.navigate(AboutRouteName.privacyStatement)
                }
                testID="AboutPrivacyStatementButton"
              />
              <NavigationButton
                accessibilityRole="button"
                label="Toegankelijkheidsverklaring"
                onPress={() =>
                  navigation.navigate(AboutRouteName.accessibilityStatement)
                }
                testID="AboutAccessibilityStatementButton"
              />
            </Column>
          </Column>
          <Column
            align="center"
            flex={1}>
            <Figure height={256}>
              <TwoPersonsHighFiveImage />
            </Figure>
          </Column>
        </Track>
      </Box>
    </Screen>
  )
}
