import {SingleSelectable} from '@/components/ui/containers'
import {Paragraph, Title} from '@/components/ui/text'
import {accessibleText} from '@/utils'

type Props = {
  testID?: string | undefined
  text: string
}

export const EmptyMessage = ({testID, text}: Props) => {
  const title = 'Helaas …'

  return (
    <SingleSelectable accessibilityLabel={accessibleText(title, text)}>
      <Title level="h3" testID={testID} text={title} />
      <Paragraph>{text}</Paragraph>
    </SingleSelectable>
  )
}
