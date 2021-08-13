import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {NewsItemsOverview} from '../components/features/NewsItemsOverview'
import {
  Box,
  Gutter,
  IconButton,
  Image,
  ScreenWrapper,
  Title,
} from '../components/ui'
import {useFetch} from '../hooks/useFetch'
import {color, image, size} from '../tokens'
import {Section} from '../types'
import {ProjectDetail} from '../types/project'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const {data: project, isLoading} = useFetch<ProjectDetail>({
    url: 'http://localhost:8000/api/v1/project/details',
    options: {
      params: `?id=${route.params.id}`,
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project?.title,
    })
  }, [navigation, project])

  const iconButtons: {
    icon: any
    title: string
    sections?: Section[]
  }[] = [
    {
      icon: <Info fill={color.font.inverse} />,
      title: 'Informatie',
      sections: project?.body.what,
    },
    {
      icon: <Calendar fill={color.font.inverse} />,
      title: 'Tijdlijn',
      sections: project?.body.when,
    },
    {
      icon: <LocationFields fill={color.font.inverse} />,
      title: 'Werkzaamheden',
      sections: project?.body.work,
    },
    {
      icon: <ChatBubble fill={color.font.inverse} />,
      title: 'Contact',
      sections: project?.body.contact,
    },
  ]

  return (
    <ScreenWrapper>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : (
        <ScrollView>
          {project?.images && project.images[0].sources.orig.url && (
            <Image
              source={{uri: project.images[0].sources.orig.url}}
              style={styles.image}
            />
          )}
          <Box background="lighter">
            <Title margin text={project?.title || ''} />
            <View style={styles.row}>
              {project &&
                iconButtons.map(iconButton =>
                  iconButton.sections?.length ? (
                    <IconButton
                      icon={iconButton.icon}
                      key={iconButton.title}
                      label={iconButton.title.replace(
                        'Werkzaamheden',
                        'Werkzaam-heden',
                      )}
                      onPress={() =>
                        navigation.navigate(routes.projectDetailBody.name, {
                          body: {
                            projectTitle: project.title,
                            sections: iconButton.sections ?? [],
                            title: iconButton.title,
                          },
                        })
                      }
                    />
                  ) : null,
                )}
            </View>
          </Box>
          <Box background="light">
            <Title level={2} text="Nieuws" />
            <Gutter height={size.spacing.md} />
            <NewsItemsOverview />
          </Box>
        </ScrollView>
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
})
