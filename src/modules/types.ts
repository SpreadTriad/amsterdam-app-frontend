import {StackNavigationOptions} from '@react-navigation/stack'
import {Slice} from '@reduxjs/toolkit'
import {ElementType} from 'react'
import {IconName} from '@/components/ui/media'
import {ModuleSlug} from '@/modules/slugs'

/**
 * The client part of a module’s configuration.
 */
export type ModuleClientConfig = {
  /**
   * Renders a badge on the home screen.
   */
  BadgeValue?: ElementType
  /**
   * A component that will be rendered at the app's root level.
   */
  PreRenderComponent?: ElementType
  /**
   * Determines whether the module should be hidden on the home screen.
   */
  hiddenInMenu?: boolean
  /**
   * Determines whether the module is a core module.
   */
  isCore?: boolean
  /**
   * Determines whether the module is for employees only.
   */
  isForEmployees?: boolean
  /**
   * The module's deeplink configuration.
   * @see https://reactnavigation.org/docs/configuring-links
   */
  linking: Record<string, string>
  /**
   * The module’s route name.
   * @see https://reactnavigation.org/docs/stack-navigator/#api-definition
   */
  name: string
  /**
   * Determines whether the module requires a Firebase token.
   */
  requiresFirebaseToken?: boolean
  /**
   * The module’s screen options.
   * @see https://reactnavigation.org/docs/stack-navigator/#options
   */
  screenOptions?: StackNavigationOptions
  /**
   * A unique human-readable identifier for the module.
   */
  slug: ModuleSlug
  /**
   * The module’s state.
   */
  state: Slice[]
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: IconName | 'projects'
  moduleSlug: ModuleSlug
  status: ModuleStatus
  title: string
  version: string
}

export enum ModuleStatus {
  active = 1,
  inactive = 0,
}

export type Module = ModuleServerConfig & ModuleClientConfig
