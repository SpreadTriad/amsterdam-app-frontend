import React from 'react'
import {Column} from '../../../../components/ui/layout'
import {Title} from '../../../../components/ui/typography'
import {Article} from '../../../../components/ui/typography/Article'
import {Section} from '../../../../types'

type Props = {
  sections: Section[]
}

export const ProjectContentSections = ({sections}: Props) => {
  return (
    <>
      {sections.map(section => (
        <Column gutter="sm" key={section.title}>
          <Title level="h2" text={section.title} />
          <Article content={section.html} />
        </Column>
      ))}
    </>
  )
}
