import {Button, Flex, Grid} from '@sanity/ui'
import {useVirtualizer} from '@tanstack/react-virtual'
import {type ReactElement, useMemo, useRef} from 'react'

import {ConfigurationIconObjectArray, IconObject} from '../types'
import {listToMatrix} from './utils'

const COLUMNS = 4

export const Results = ({
  provider,
  icons,
  onClick,
  query,
}: {
  provider: string
  icons: ConfigurationIconObjectArray
  onClick: (icon: IconObject) => void
  query: string
}): ReactElement => {
  const filteredIcon = useMemo(() => {
    if (!query || query.length === 0) return icons
    const lowercaseQuery = query.toLowerCase()
    return icons.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(lowercaseQuery) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      )
    })
  }, [icons, query])

  const parentRef = useRef<HTMLDivElement>(null)
  const grid = useMemo(() => {
    return listToMatrix(filteredIcon, COLUMNS)
  }, [filteredIcon])
  const rowVirtualizer = useVirtualizer({
    gap: 8,
    count: grid.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 25,
    overscan: 5,
  })

  return (
    <div ref={parentRef} style={{position: 'relative', height: 400, overflowY: 'auto'}}>
      <Flex
        direction={'column'}
        gap={2}
        padding={0}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
          width: '100%',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowIcons = grid[virtualRow.index]
          if (!rowIcons) return null
          return (
            <Grid
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              columns={COLUMNS}
              gap={2}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${25}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowIcons.map((icon) => (
                <Button
                  key={icon.name}
                  icon={icon.component()}
                  onClick={() => onClick({...icon, provider})}
                  mode="ghost"
                  tone="default"
                  paddingX={2}
                  paddingY={1}
                />
              ))}
            </Grid>
          )
        })}
      </Flex>
    </div>
  )
}
