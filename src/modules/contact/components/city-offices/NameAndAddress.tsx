import React from 'react'
import {useDispatch} from 'react-redux'
import {TopTaskButton} from '@/components/ui/buttons'
import {SingleSelectable} from '@/components/ui/containers'
import {Column} from '@/components/ui/layout'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {CityOffice} from '@/modules/contact/types'
import {toggleBottomSheet} from '@/store'
import {accessibleText} from '@/utils'

type Props = Pick<CityOffice, 'address' | 'addressContent' | 'title'> & {
  testID: string
}

export const NameAndAddress = ({
  address,
  addressContent,
  title,
  testID,
}: Props) => {
  const dispatch = useDispatch()

  return (
    <Column gutter="md">
      <TopTaskButton
        accessibilityHint="Tik om een ander stadsloket te selecteren."
        iconName="city-office"
        onPress={() => dispatch(toggleBottomSheet())}
        text={
          <SingleSelectable
            accessibilityLabel={accessibleText(
              `${address.streetName} ${address.streetNumber}`,
              address.postalCode,
              address.city,
            )}>
            <Phrase variant="small">
              {address.streetName} {address.streetNumber}
            </Phrase>
            <Phrase variant="small">
              {address.postalCode} {address.city}
            </Phrase>
          </SingleSelectable>
        }
        titleIconName="chevron-down"
        {...{title, testID}}
      />
      {!!addressContent && (
        <>
          <Title level="h5" text={addressContent.title} />
          {/* TODO Make this either HTML or text in our database. */}
          <Paragraph>{addressContent.html}</Paragraph>
        </>
      )}
    </Column>
  )
}
