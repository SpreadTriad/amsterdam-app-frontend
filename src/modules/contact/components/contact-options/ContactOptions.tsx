import {Key} from 'react'
import {PressableProps} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {IconName} from '@/components/ui/media/iconPaths'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {OpenPhoneUrl, useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {OpenWebUrl, useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useEnvironment} from '@/store/slices/environment'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {formatPhoneNumber} from '@/utils/formatPhoneNumber'

type ContactOption = {
  iconName: IconName
  key: Key
  text: string
  title: string
} & Partial<
  Pick<
    PressableProps,
    | 'accessibilityHint'
    | 'accessibilityLabel'
    | 'accessibilityRole'
    | 'testID'
    | 'onPress'
  >
>

const getContactOptions = (
  openPhoneUrl: OpenPhoneUrl,
  openWebUrl: OpenWebUrl,
  complaintUrl: string,
): ContactOption[] => [
  {
    accessibilityHint: 'Opent een link naar een formulier.',
    accessibilityLabel: 'Gebruik ons contactformulier',
    accessibilityRole: 'link',
    iconName: 'email',
    key: 'email',
    onPress: () => openWebUrl(complaintUrl),
    testID: 'ContactContactFormButton',
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
  {
    accessibilityLabel: 'Bel veertien nul twintig',
    iconName: 'phone',
    key: 'phone',
    onPress: () => openPhoneUrl('14020'),
    testID: 'ContactPhoneButton',
    text: 'Gemiddeld 5 minuten wachten',
    title: 'Bel 14 020',
  },
  {
    accessibilityLabel:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    iconName: 'whatsapp',
    key: 'whatsapp',
    onPress: () => openWebUrl('https://wa.me/31644440655'),
    testID: 'ContactWhatsAppButton',
    text: 'Reactie binnen 2 uur',
    title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
  },
  {
    accessibilityHint: 'Opent een link naar een website.',
    accessibilityLabel: 'Ga naar Mijn Amsterdam',
    accessibilityRole: 'link',
    iconName: 'person',
    key: 'mijn-amsterdam',
    onPress: () => openWebUrl('https://mijn.amsterdam.nl/'),
    testID: 'ContactMijnAmsterdamButton',
    text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
    title: 'Mijn Amsterdam',
  },
]

export const ContactOptions = () => {
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()
  const {complaintUrl} = useEnvironment()

  const contactOptions = getContactOptions(
    openPhoneUrl,
    openWebUrl,
    complaintUrl,
  )

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title
            testID="ContactContactOptionsTitle"
            text="Kunnen we u helpen?"
          />
          <Paragraph testID="ContactContactOptionsText">
            Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact
            met ons op.
          </Paragraph>
        </Column>
        <Column gutter="md">
          {contactOptions.map(props => (
            <TopTaskButton
              {...props}
              accessibilityLabel={accessibleText(
                props.accessibilityLabel ?? props.title,
                props.text,
              )}
            />
          ))}
        </Column>
      </Column>
    </Box>
  )
}
