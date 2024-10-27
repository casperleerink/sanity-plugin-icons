import {AddIcon, TrashIcon} from '@sanity/icons'
import {Button, Card, Dialog, Flex, Spinner, Tab, TabList, TabPanel} from '@sanity/ui'
import {type ReactElement, useMemo, useState, useTransition} from 'react'
import {type ObjectInputProps, set, setIfMissing, unset} from 'sanity'

import type {IconObject, ProviderConfiguration} from '../types'
import {Results} from './results'
import {SearchBar} from './search-bar'
export const IconPicker = ({
  schemaType,
  value,
  readOnly,
  onChange,
  configurations,
}: ObjectInputProps<{
  provider?: string | null
  name?: string | null
} | null> & {configurations: ProviderConfiguration[]}): ReactElement => {
  const [query, setQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [currentTab, setCurrentTab] = useState(configurations[0].provider)
  const [dialogOpen, setDialogOpen] = useState(false)

  const showTabs = configurations.length > 1

  const selectedIcon = useMemo(() => {
    if (!value) return null
    if (!value.name || !value.provider) return null
    const icon = configurations
      .find((c) => c.provider === value.provider)
      ?.icons()
      .find((i) => i.name === value.name)
    if (!icon) return null
    return {
      ...icon,
      provider: value.provider,
    } as IconObject
  }, [value, configurations])
  const SelectedIconComponent = selectedIcon?.component()

  const providerIcons = useMemo(() => {
    const providerIconsResult = configurations.find((c) => c.provider === currentTab)?.icons()
    if (!providerIconsResult) return []
    return providerIconsResult
  }, [currentTab, configurations])

  const onQueryChange = (inputValue: string) => {
    setQuery(inputValue)
    startTransition(() => {
      setFilterQuery(inputValue)
    })
  }

  const unsetIcon = () => {
    return onChange(unset())
  }

  const setIcon = (icon: IconObject) => {
    if (selectedIcon && selectedIcon.name === icon.name) {
      return unsetIcon()
    }
    return onChange([
      setIfMissing({
        _type: schemaType.name,
      }),
      set(icon.name, ['name']),
      set(icon.provider, ['provider']),
    ])
  }
  return (
    <Card>
      <Flex gap={2}>
        <Button
          disabled={readOnly}
          icon={selectedIcon ? SelectedIconComponent : AddIcon}
          mode="ghost"
          tone="default"
          text={selectedIcon ? undefined : 'Add icon'}
          onClick={() => setDialogOpen(!dialogOpen)}
        />
        {selectedIcon ? (
          <Button
            icon={TrashIcon}
            mode="ghost"
            tone="critical"
            text={'Remove Icon'}
            onClick={unsetIcon}
          />
        ) : null}
      </Flex>
      {dialogOpen ? (
        <Dialog
          onClose={() => setDialogOpen(false)}
          id="icon-dialog"
          header="Icon Picker"
          zOffset={1000}
        >
          <Flex direction={'column'} gap={2} padding={1}>
            <SearchBar value={query} onChange={onQueryChange} />
            {showTabs ? (
              <TabList space={2}>
                {configurations.map((c) => (
                  <Tab
                    aria-controls={`${c.provider}-panel`}
                    key={c.provider}
                    id={c.provider}
                    label={c.title}
                    onClick={() => setCurrentTab(c.provider)}
                    selected={currentTab === c.provider}
                  />
                ))}
              </TabList>
            ) : null}
            {isPending ? (
              <Flex justify={'center'} align={'center'} style={{width: '100%', height: 400}}>
                <Spinner />
              </Flex>
            ) : (
              configurations.map((c) => {
                return (
                  <TabPanel
                    key={c.provider}
                    aria-labelledby={c.provider}
                    id={`${c.provider}-panel`}
                    hidden={currentTab !== c.provider}
                  >
                    <Results
                      icons={providerIcons}
                      query={filterQuery}
                      provider={c.provider}
                      onClick={(icon) => {
                        setIcon(icon)
                        setDialogOpen(false)
                      }}
                    />
                  </TabPanel>
                )
              })
            )}
          </Flex>
        </Dialog>
      ) : null}
    </Card>
  )
}
