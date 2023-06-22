import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/useOpenWebUrl'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {City} from '@/modules/report-problem/types'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ReportProblemRouteName.reportProblem
  >
}

export const ReportProblemScreen = ({navigation}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Box>
      <Column gutter="md">
        <Title text="Melding openbare ruimte en overlast" />
        <Paragraph>
          Ziet u op straat of in een park iets waarvan u wilt dat het gemaakt of
          opgeruimd wordt, dan kunt u dat bij de gemeente melden. U kunt ook een
          gevaarlijke verkeerssituatie of overlast van personen en horeca aan
          ons doorgeven.
        </Paragraph>
        <Paragraph>
          U kunt op{' '}
          <InlineLink
            onPress={() =>
              openWebUrl('https://meldingen.amsterdam.nl/meldingenkaart')
            }>
            de meldingenkaart
          </InlineLink>{' '}
          zien welke meldingen al bekend zijn bij de gemeente. Staat uw melding
          er niet bij? Doe dan hieronder een nieuwe melding.
        </Paragraph>
        <Row
          gutter="md"
          wrap>
          <Button
            label="Doe een melding Amsterdam"
            onPress={() =>
              navigation.navigate(ReportProblemRouteName.reportProblemWebView, {
                city: City.Amsterdam,
              })
            }
          />
          <Button
            label="Doe een melding Weesp"
            onPress={() =>
              navigation.navigate(ReportProblemRouteName.reportProblemWebView, {
                city: City.Weesp,
              })
            }
          />
        </Row>
        <Paragraph variant="small">
          Meldingen over afval en containers in Weesp doet u via{' '}
          <InlineLink
            onPress={() =>
              openWebUrl(
                'https://www.gad.nl/mijn-vraag-melding/iets-melden-of-aanvragen/',
              )
            }>
            de website van de GAD
          </InlineLink>{' '}
          of via telefoonnummer 035 699 1888.
        </Paragraph>
      </Column>
    </Box>
  )
}
