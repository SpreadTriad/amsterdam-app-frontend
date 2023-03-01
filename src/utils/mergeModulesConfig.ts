import {Module, ModuleClientConfig, ModuleServerConfig} from '@/modules/types'
import {nonNullable} from '@/utils/nonNullable'

export const mergeModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig?: ModuleServerConfig[],
): Module[] => {
  if (!serverConfig) {
    return [] as Module[]
  }

  return serverConfig
    .map(serverModule => {
      const clientModule = clientConfig.find(
        m => serverModule.moduleSlug === m.slug,
      )

      if (clientModule) {
        return {...serverModule, ...clientModule}
      }
    })
    .filter(nonNullable)
}
