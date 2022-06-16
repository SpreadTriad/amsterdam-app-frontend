import React from 'react'
import {Box, PleaseWait} from '../../../components/ui'
import {Icon} from '../../../components/ui/media'
import {Paragraph} from '../../../components/ui/typography'
import {color} from '../../../tokens'
import {icons} from '../config'
import {useModules} from '../hooks'
import {ModuleButton} from './ModuleButton'
import {Column} from '@/components/ui/layout'

export const Modules = () => {
  const {getSelectedModules, isLoadingModules} = useModules()
  const modules = getSelectedModules()

  if (isLoadingModules) {
    return <PleaseWait />
  }

  if (!modules?.length) {
    return (
      <Box insetHorizontal="md" insetVertical="xxxl">
        <Paragraph>
          Alle modules staan uit. Daardoor is hier niet veel te doen. Zet er
          snel één of meer weer aan via de instellingen rechtsboven.
        </Paragraph>
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {modules.map(({icon, name, slug, title}) => {
          const ModuleIcon = icons[icon]

          return (
            <ModuleButton
              icon={
                <Icon size={24}>
                  <ModuleIcon fill={color.font.regular} />
                </Icon>
              }
              key={slug}
              label={title}
              name={name}
            />
          )
        })}
      </Column>
    </Box>
  )
}
