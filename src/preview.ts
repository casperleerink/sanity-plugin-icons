import {type ReactNode} from 'react'

import {ProviderConfiguration} from './types'

interface PreviewProps {
  provider: string
  name: string
  configurations: ProviderConfiguration[]
}
export const preview = ({provider, name, configurations}: PreviewProps): ReactNode | null => {
  if (!provider || !name) return null
  const icons = configurations.find((config) => config.provider === provider)?.icons()
  const found = icons?.find((icon) => icon.name === name)
  return found?.component() || null
}
