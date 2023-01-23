import {View} from 'react-native'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ProjectContact} from '@/modules/construction-work/types'
import {
  accessibleText,
  capitalizeString,
  formatPhoneNumber,
  openMailUrl,
  openPhoneUrl,
} from '@/utils'

type Props = {
  contacts: ProjectContact[]
  emailSubject?: string
}

export const ProjectContacts = ({contacts, emailSubject}: Props) => (
  <Column gutter="xl">
    {contacts.map(({address, email, name, phone, position}) => (
      <Column gutter="md" key={name + email}>
        <View>
          {!!name && <Title level="h3" text={name} />}
          {!!position && <Paragraph>{capitalizeString(position)}</Paragraph>}
        </View>
        {!!phone && (
          <Row>
            <Button
              accessibilityLabel={accessibleText(
                'Bel',
                ...(formatPhoneNumber(phone) ?? '').split(' '),
              )}
              iconName="phone"
              label={formatPhoneNumber(phone)}
              onPress={() => {
                openPhoneUrl(phone)
              }}
            />
          </Row>
        )}
        {!!email && (
          <Row>
            <Button
              accessibilityLabel={accessibleText(
                'Stuur een e-mail naar',
                email,
              )}
              ellipsizeMode="tail"
              iconName="email"
              label={email}
              numberOfLines={1}
              onPress={() => {
                openMailUrl(email, emailSubject)
              }}
            />
          </Row>
        )}
        {!!address && <Paragraph>{address}</Paragraph>}
      </Column>
    ))}
  </Column>
)
