export type NewNotification = {
  title: string
  body: string
  project_identifier: string
  news_identifier?: string
  warning_identifier?: string
}

export type Notification = NewNotification & {
  identifier: string
  publication_date: string
}

export type FrontEndNotification = Notification & {
  isRead?: boolean
  projectTitle: string
}

export type PushNotificationData = {
  type?: string
  linkSourceid?: string
}

export type PushNotification = {
  data?: PushNotificationData
}
