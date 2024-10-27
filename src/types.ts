import {type ReactNode} from 'react'

export interface IconObject {
  provider: string
  name: string
  component: () => ReactNode
  tags: string[]
}

export type ConfigurationIconObject = Omit<IconObject, 'provider'>

export type ConfigurationIconObjectArray = Array<ConfigurationIconObject>

export type IconObjectArray = Array<IconObject>

export interface ProviderConfiguration {
  title: string
  provider: string
  icons: () => ConfigurationIconObjectArray
}
