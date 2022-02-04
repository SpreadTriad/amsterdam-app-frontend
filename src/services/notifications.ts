import {
  DraftNotification,
  Notification,
  Notifications,
  QueryArgs,
} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {emptySplitApi} from './init'

// Define a service using a base URL and expected endpoints
export const notificationsApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notifications, Partial<QueryArgs>>({
      providesTags: ['Notifications'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl('/notifications', q)
      },
      transformResponse: (response: {result: Notifications}) => response.result,
    }),
    addNotification: builder.mutation<Notification, DraftNotification>({
      invalidatesTags: ['Notifications'],
      query(body) {
        return {
          url: '/notification',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAddNotificationMutation, useGetNotificationsQuery} =
  notificationsApi
