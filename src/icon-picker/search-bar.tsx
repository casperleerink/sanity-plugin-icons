import {TextInput} from '@sanity/ui'
import {type ChangeEvent, type ReactElement, useCallback} from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

export const SearchBar = ({value, onChange}: Props): ReactElement => {
  const onQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      onChange(inputValue)
    },
    [onChange],
  )
  return (
    <TextInput
      fontSize={2}
      padding={4}
      placeholder="Search Icons"
      value={value}
      onChange={onQueryChange}
    />
  )
}
