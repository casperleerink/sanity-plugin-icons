# sanity-plugin-icons

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-icons
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js) and add the icon packages you use to the configuration array. (minimum of one provider is required)

### Example with Sanity Icons and Lucide Icons:

> Note that it is a better practice to limit the amount of icons you configure here to the icons you actually use in your project as the bundle size of your frontend and studio will increase when importing large icon libraries.

```ts
import {defineConfig} from 'sanity';
import {iconPicker} from 'sanity-plugin-icons'; // Or iconPickerTyped if you want to use the sanity typed package.
import { icons as lucideIcons } from "lucide-react";
import { icons as sanityIcons } from "@sanity/icons";

export default defineConfig({
  //...
  plugins: [iconPicker({
    configurations: [
       {
          title: "Lucide Icons",
          provider: "lucide",
          icons: () => {
            return Object.entries(lucideIcons).map(([name, icon]) => {
              const Component = icon;
              return {
                name: name,
                component: () => <Component size={20} />,
                tags: [name],
              };
            });
          },
        },
        {
          title: "Sanity Icons",
          provider: "sanity",
          icons: () => {
            return Object.entries(sanityIcons).map(([name, Component]) => {
              return {
                name: name,
                component: () => <Component />,
                tags: [name],
              };
            });
          },
        },
    ],
  })],
})
```

## Usage in your frontend

```tsx
import {icons as lucideIcons} from 'lucide-react'
import {icons as sanityIcons} from '@sanity/icons'

// Example data you get from sanity
const data = {
  _type: 'iconPicker',
  name: 'Beer',
  provider: 'lucide',
  _updatedAt: '2021-07-25T02:30:43.141Z',
}

const icons = {
  lucide: lucideIcons,
  sanity: sanityIcons,
}
export default function App() {
  const Icon = icons[data.provider][data.name]
  return (
    <div className="App">
      <Icon />
    </div>
  )
}
```

## License

[MIT](LICENSE) © Casper Leerink

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
