import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {color, font, size} from '../tokens'

type ProjectDetailTimelineScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailTimeline'
>

type Props = {
  route: ProjectDetailTimelineScreenRouteProp
}

export const ProjectDetailTimelineScreen = ({route}: Props) => {
  const {project} = route.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.title,
    })
  })

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <View style={styles.row}>
            <Calendar fill={color.font.primary} style={styles.icon} />
            <Title primary text="Tijdlijn" />
          </View>
        </Box>
        <Box>
          {project.body.when ? (
            <Section
              title={project.body.when.title}
              text={project.body.when.text}
            />
          ) : (
            <Text>Geen informatie gevonden.</Text>
          )}
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: font.height.h1,
    marginRight: size.spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
})
