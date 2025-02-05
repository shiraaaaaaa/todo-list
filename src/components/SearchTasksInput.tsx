import { useContext } from 'react'
import { InputAdornment } from '@mui/material'
import { SearchTaskContext } from '../contexts/SearchTaskContext'
import DebouncedInput from './DebounceInput'
import SearchIcon from '@mui/icons-material/Search'

function SearchTasksInput() {
  const { searchValue, setSearchValue } = useContext(SearchTaskContext)

  return (
    <DebouncedInput
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      placeholder="search..."
      value={searchValue}
      onChange={(value) => setSearchValue(value as string)}
    />
  )
}

export default SearchTasksInput
