import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import AboutScreen from '../screens/about.screen'
import HomeScreen from '../screens/home.screen'
import WelcomeScreen from '../screens/welcome.screen'

const features = loadFeatures('e2e/features/about.feature', {
  tagFilter: '@included and not @excluded',
})

const aboutSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
    await WelcomeScreen.tapWelcomeScreen()
    await HomeScreen.tapModule('Over deze app')
  })

  given(/ik ben op het over deze app scherm/, async () => {
    await expect(AboutScreen.HeaderTitle).toBeVisible()
    await expect(AboutScreen.amsterdamAppTitle).toBeVisible()
    await expect(AboutScreen.HeaderTitle).toHaveText('Over deze app')
    await expect(AboutScreen.amsterdamAppTitle).toHaveText('Amsterdam App')
  })

  then(/ik zie het versie nummer/, async () => {
    await expect(AboutScreen.versionNumberText).toBeVisible()
    await expect(AboutScreen.versionNumberText).toHaveText(
      AboutScreen.releaseVersionNumber,
    )
  })

  when(/ik klik op 'Waarom deze app\?'/, async () => {
    await AboutScreen.aboutTheAppDutchButton.tap()
  })

  then(/ik zie een scherm met uitleg over de app/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('Waarom deze app?')
    await waitFor(AboutScreen.aboutTheAppDutchTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(AboutScreen.aboutTheAppDutchIntroParagraph).toBeVisible()
    await expect(AboutScreen.aboutTheAppDutchWasteInformationTitle).toBeVisible
    await AboutScreen.aboutTheAppDutchWasteInformationTitle.swipe(
      'up',
      'fast',
      0.3,
    )
    await expect(AboutScreen.aboutTheAppDutchRoadWorkTitle).toBeVisible()
    await expect(AboutScreen.aboutTheAppDutchReportProblemTitle).toBeVisible()
    await AboutScreen.aboutTheAppDutchReportProblemTitle.swipe('up')
    await expect(AboutScreen.aboutTheAppDutch1AppTitle).toBeVisible()
    await expect(AboutScreen.aboutTheAppDutchFutureFeaturesTitle).toBeVisible()
  })

  when(/ik klik op 'About this app'/, async () => {
    await AboutScreen.aboutTheAppEnglishButton.tap()
  })

  then(/ik zie een scherm met uitleg over deze app in het Engels/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('About this app')
    await waitFor(AboutScreen.aboutTheAppEnglishTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(AboutScreen.aboutTheAppEnglishIntroParagraph).toBeVisible()
    await expect(
      AboutScreen.aboutTheAppEnglishWasteInformationTitle,
    ).toBeVisible()
    await AboutScreen.aboutTheAppEnglishWasteInformationTitle.swipe(
      'up',
      'fast',
      0.3,
    )
    await waitFor(AboutScreen.aboutTheAppEnglishRoadWorkTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(element(by.text('Road Work'))).toBeVisible()
    await expect(AboutScreen.aboutTheAppEnglishReportProblemTitle).toBeVisible()
    await AboutScreen.aboutTheAppEnglishReportProblemTitle.swipe('up')
    await waitFor(AboutScreen.aboutTheAppEnglish1AppTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(AboutScreen.aboutTheAppEnglish1AppTitle).toBeVisible()
    await expect(
      AboutScreen.aboutTheAppEnglishFutureFeaturesTitle,
    ).toBeVisible()
  })

  when(/ik klik op 'Privacyverklaring'/, async () => {
    await AboutScreen.privacyStatementButton.tap()
  })

  then(/ik zie een scherm met de Privacyverklaring/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('Privacyverklaring')
    await waitFor(AboutScreen.privacyStatementTitle)
      .toBeVisible()
      .withTimeout(2000)
    await element(AboutScreen.privacyStatementParagraph).swipe(
      'up',
      'fast',
      0.5,
    )
    await expect(AboutScreen.privacyStatementPersonalDataTitle).toBeVisible()
    await expect(AboutScreen.privacyStatementLinksTitle).toBeVisible()
    await AboutScreen.privacyStatementLinksTitle.swipe('up')
    await expect(AboutScreen.privacyStatementGeneralLink).toBeVisible()
    await expect(AboutScreen.privacyStatementSpecificLink).toBeVisible()
  })

  when(/ik klik op 'Toegankelijkheidsverklaring'/, async () => {
    await AboutScreen.accessibilityStatementButton.tap()
  })

  then(/ik zie een scherm met de Toegankelijkheidsverklaring/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText(
      'Toegankelijkheidsverklaring',
    )
  })

  and(/ik kan een mail sturen als er iets niet werkt/, async () => {
    await element(by.text('Genomen maatregelen')).swipe('up')
    await element(by.text('Werkt iets niet?')).swipe('up')
    await expect(
      AboutScreen.accessibilityStatementSomethingBrokenButton,
    ).toBeVisible()
  })
}

autoBindSteps(features, [aboutSteps])
