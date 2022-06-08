import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

/**
 * The client part of a module’s configuration.
 */
export type ModuleClientConfig = {
  isCore?: boolean
  linking: Record<string, string>
  name: string
  slug: string
  stack: ComponentType<any>
  state: Slice[]
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: string
  slug: string
  status: number
  title: string
  version: string
}

export type Module = ModuleServerConfig & ModuleClientConfig
