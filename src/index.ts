import {castFromTyped} from '@sanity-typed/types'
import {defineField, definePlugin, defineType, type ObjectInputProps} from 'sanity'

import {IconPicker} from './icon-picker/icon-picker'
import {ProviderConfiguration} from './types'

interface IconPickerOptions {
  configurations: ProviderConfiguration[]
}

export const iconPickerTyped = definePlugin<IconPickerOptions>(({configurations}) => {
  if (!configurations || configurations.length === 0) {
    throw new Error('Please provide at least one icon provider')
  }
  return {
    name: 'sanity-plugin-icon-picker',
    schema: {
      types: [
        defineType({
          title: 'Icon Picker',
          name: 'iconPicker',
          type: 'object',
          components: {
            input: (props: ObjectInputProps) => IconPicker({...props, configurations}),
          },
          fields: [
            defineField({
              title: 'Provider',
              name: 'provider',
              type: 'string',
            }),
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
            }),
          ],
        }),
      ],
    },
  }
})

export const iconPicker = castFromTyped(iconPickerTyped)

export {preview} from './preview'
