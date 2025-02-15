import {Button} from '@/components/ui/buttons/Button'
import {FauxButton} from '@/components/ui/buttons/FauxButton'
import {PhoneHQButton} from '@/components/ui/buttons/PhoneHQButton'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

type Props = {
  buttonLabel: string
  buttonUrl: string
  sectionTitle: string
  withPhoneButton?: boolean
}

export const FractionButtonSection = ({
  buttonLabel,
  buttonUrl,
  sectionTitle,
  withPhoneButton = false,
}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Row
      gutter="xs"
      valign="start">
      <FauxButton>
        <Phrase emphasis="strong">{sectionTitle}: </Phrase>
      </FauxButton>
      <Row
        gutter="sm"
        wrap>
        <Button
          label={buttonLabel}
          onPress={() => openWebUrl(buttonUrl)}
        />
        {!!withPhoneButton && <PhoneHQButton variant="secondary" />}
      </Row>
    </Row>
  )
}
