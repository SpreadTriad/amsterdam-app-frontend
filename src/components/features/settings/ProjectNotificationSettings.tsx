import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../../../hooks'
import {size} from '../../../tokens'
import {NotificationSettings, ProjectOverviewItem} from '../../../types'
import {accessibleText} from '../../../utils'
import {
  Attention,
  Box,
  Button,
  Divider,
  Text,
  TextButton,
  Title,
} from '../../ui'
import {Checkbox, Switch} from '../../ui/forms'
import {Column, Row, ScrollView} from '../../ui/layout'
import {ProjectTitle} from '../project'

export const ProjectNotificationSettings = () => {
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)
  const [
    projectNotificationSettingHasChanged,
    setProjectNotificationSettingHasChanged,
  ] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  // Retrieve all projects from backend
  // TODO Don’t fetch if notifications disabled – move the list into its own component
  const {data: allProjects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })
  const subscribableProjectIds = Object.keys(
    notificationSettings?.projects ?? {},
  )

  // Initially retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveSettings = async () => {
      const currentNotificationSettings: NotificationSettings =
        await asyncStorage.getData('notifications')
      setNotificationSettings(currentNotificationSettings)
    }

    retrieveSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve notification settings when navigating back to this screen (from projects)
  useFocusEffect(
    useCallback(() => {
      const listener = async () => {
        const currentNotificationSettings: NotificationSettings =
          await asyncStorage.getData('notifications')
        setNotificationSettings(currentNotificationSettings)
      }

      listener()

      return () => setProjectNotificationSettingHasChanged(false)
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  )

  // Toggle enabled notification settings
  // and unsubscribe from all projects if disabling notifications
  const toggleNotificationsEnabled = (projectsEnabled: boolean) => {
    const projects = projectsEnabled
      ? notificationSettings?.projects ?? {}
      : Object.fromEntries(
          Object.keys(notificationSettings?.projects ?? {}).map(projectId => [
            projectId,
            false,
          ]),
        )

    setNotificationSettings({
      ...notificationSettings,
      projectsEnabled,
      projects,
    })

    setProjectNotificationSettingHasChanged(true)
  }

  // Toggle notification settings for a project
  // TODO Move to device registration hook
  const toggleProjectSubscription = (
    projectId: string,
    subscribed: boolean,
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      projects: {
        ...notificationSettings?.projects,
        [projectId]: subscribed,
      },
    })

    setProjectNotificationSettingHasChanged(true)
  }

  const toggleProjectListing = (projectId: string) =>
    setSelectedProjects(
      selectedProjects.includes(projectId)
        ? selectedProjects.filter(id => id !== projectId)
        : [...selectedProjects, projectId],
    )

  const deleteProjects = () => {
    const projects = notificationSettings?.projects ?? {}
    selectedProjects.map((id: string) => delete projects[id])

    setNotificationSettings({
      ...notificationSettings,
      projects,
    })

    setIsEditing(!isEditing)
    setProjectNotificationSettingHasChanged(true)
  }

  // Store changed notification settings on device
  // Clear projects in device registration if project notifications are disabled
  const storeSettings = useCallback(async () => {
    if (notificationSettings === undefined) {
      return
    }

    await asyncStorage.storeData('notifications', notificationSettings)

    await deviceRegistration.store(
      notificationSettings?.projectsEnabled
        ? notificationSettings.projects ?? {}
        : {},
    )
  }, [notificationSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    projectNotificationSettingHasChanged && storeSettings()
  }, [projectNotificationSettingHasChanged, storeSettings])

  if (isLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    )
  }

  return (
    <ScrollView>
      <Box
        background="white"
        borderVertical
        insetHorizontal="md"
        insetVertical="sm">
        <Switch
          accessibilityLabel="Berichten ontvangen"
          label={<Text>Berichten ontvangen</Text>}
          onValueChange={() =>
            toggleNotificationsEnabled(!notificationSettings?.projectsEnabled)
          }
          value={notificationSettings?.projectsEnabled}
        />
      </Box>
      <Box>
        {!notificationSettings?.projectsEnabled && (
          <Box background="white">
            <Column gutter="md">
              <Title level={2} text="U ontvangt geen berichten" />
              <Text intro>
                Voor werkzaamheden sturen we af en toe een pushbericht. Dit doen
                we alleen als er iets aan de hand is wat u écht moet weten.
                Zoals een gesprongen waterleiding waardoor de weg is afgezet.
              </Text>
              <Text>
                U kunt pushberichten aan zetten op de pagina van een
                werkzaamheid. Onder ‘Instellingen’ vindt u een overzicht van de
                werkzaamheden waarvoor u pushberichten ontvangt. Deze kunt u
                altijd weer uit zetten.
              </Text>
              <Text>
                U kunt uw toestemming voor pushberichten intrekken via de
                instellingen van uw toestel. Berichten over uw geselecteerde
                werkzaamheden verschijnen dan nog wel in de app, maar niet meer
                in het berichtencentrum van uw toestel.
              </Text>
              <TextButton
                emphasis
                onPress={() => navigation.navigate('ProjectOverview')}
                text="Naar werkzaamheden"
              />
            </Column>
          </Box>
        )}
        {notificationSettings?.projectsEnabled &&
        !subscribableProjectIds.length ? (
          <Column gutter="md">
            <Attention>
              <Text>
                Zet berichten aan op pagina’s van werkzaamheden waar u berichten
                voor wilt ontvangen.
              </Text>
            </Attention>
            <TextButton
              emphasis
              onPress={() => navigation.navigate('ProjectOverview')}
              text="Naar werkzaamheden"
            />
          </Column>
        ) : null}
      </Box>
      {notificationSettings?.projectsEnabled &&
      subscribableProjectIds.length ? (
        <Column gutter="md">
          <Column gutter="sm">
            <View style={styles.customInset}>
              <Text intro accessibilityRole="header">
                Werkzaamheden
              </Text>
            </View>
            <Box background="white" borderVertical insetHorizontal="md">
              {subscribableProjectIds.map((projectId, index) => {
                const project = allProjects?.find(
                  p => p.identifier === projectId,
                )
                const subscribed =
                  notificationSettings?.projects?.[projectId] ?? false

                return (
                  project && (
                    <Fragment key={project.identifier}>
                      <Box insetVertical="sm">
                        {isEditing ? (
                          <Checkbox
                            accessibilityLabel={accessibleText(
                              project.title,
                              project.subtitle,
                            )}
                            label={
                              <ProjectTitle
                                title={project.title}
                                subtitle={project.subtitle}
                              />
                            }
                            onValueChange={() =>
                              toggleProjectListing(project.identifier)
                            }
                            value={selectedProjects.includes(
                              project.identifier,
                            )}
                          />
                        ) : (
                          <Switch
                            accessibilityLabel={accessibleText(
                              project.title,
                              project.subtitle,
                            )}
                            label={
                              <ProjectTitle
                                title={project.title}
                                subtitle={project.subtitle}
                              />
                            }
                            onValueChange={() =>
                              toggleProjectSubscription(
                                project.identifier,
                                !subscribed,
                              )
                            }
                            value={subscribed}
                          />
                        )}
                      </Box>
                      {index < (subscribableProjectIds.length ?? 0) - 1 && (
                        <Divider />
                      )}
                    </Fragment>
                  )
                )
              })}
            </Box>
          </Column>
          {isEditing ? (
            <Box insetHorizontal="md">
              <Button
                variant="secondary"
                onPress={() => deleteProjects()}
                text="Verwijder werkzaamheden"
              />
            </Box>
          ) : (
            <Row align="center">
              <TextButton
                emphasis
                onPress={() => setIsEditing(!isEditing)}
                text="Werkzaamheden verwijderen"
              />
            </Row>
          )}
        </Column>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  customInset: {
    paddingHorizontal: size.spacing.md,
  },
})
