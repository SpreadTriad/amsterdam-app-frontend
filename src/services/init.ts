import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import {getUniqueId} from 'react-native-device-info'
// eslint-disable-next-line no-restricted-imports
import {version as releaseVersion} from '@/../package.json'
import {EnvironmentConfig} from '@/environment'
import {ProjectsEndpointName} from '@/modules/construction-work/types'
import {ConstructionWorkEditorEndpointName} from '@/modules/construction-work-editor/types'
import {selectAuthManagerToken} from '@/store/slices/auth'
import {selectEnvironment} from '@/store/slices/environment'
import {RootState} from '@/store/types/rootState'
import {DeviceRegistrationEndpointName} from '@/types/device'
import {deviceAuthorizationToken} from '@/utils/getAuthToken'

const managerAuthorizedEndpoints = [
  'addNotification',
  ConstructionWorkEditorEndpointName.getProjectManager,
  ConstructionWorkEditorEndpointName.addProjectWarning,
  ConstructionWorkEditorEndpointName.addProjectWarningImage,
]

const deviceIdRequestingEndpoints: string[] = [
  ProjectsEndpointName.followProject,
  ProjectsEndpointName.getProject,
  ProjectsEndpointName.getProjects,
  ProjectsEndpointName.getProjectsFollowedArticles,
  ProjectsEndpointName.unfollowProject,
  DeviceRegistrationEndpointName.registerDevice,
  DeviceRegistrationEndpointName.unregisterDevice,
]

const deviceAuthorizationHeaderEndpoints: string[] = [
  ProjectsEndpointName.followProject,
  ProjectsEndpointName.unfollowProject,
  DeviceRegistrationEndpointName.registerDevice,
  DeviceRegistrationEndpointName.unregisterDevice,
]

const dynamicBaseQuery: BaseQueryFn<
  string | (FetchArgs & {api?: keyof EnvironmentConfig}),
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const api = typeof args !== 'string' && args.api ? args.api : 'apiUrl'

  return retry(
    async () => {
      const result = await fetchBaseQuery({
        baseUrl: selectEnvironment(baseQueryApi.getState() as RootState)[api],
        prepareHeaders: (headers, {endpoint, getState}) => {
          const token = selectAuthManagerToken(getState() as RootState)

          token &&
            managerAuthorizedEndpoints.includes(endpoint) &&
            headers.set('userauthorization', token)

          deviceIdRequestingEndpoints.includes(endpoint) &&
            headers.set('deviceid', getUniqueId())

          deviceAuthorizationHeaderEndpoints.includes(endpoint) &&
            headers.set('DeviceAuthorization', deviceAuthorizationToken)

          headers.set('releaseVersion', releaseVersion)

          return headers
        },
      })(args, baseQueryApi, extraOptions)

      if (result.error?.status === 404) {
        retry.fail(result.error)
      }

      return result
    },

    {maxRetries: 5},
  )(args, baseQueryApi, extraOptions as never)
}

export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: [
    'Articles',
    'FollowedProjects',
    'Modules',
    'Notifications',
    'Projects',
  ],
})
