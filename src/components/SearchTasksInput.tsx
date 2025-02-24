import { InputAdornment } from '@mui/material'
import DebouncedInput from './DebounceInput'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchTaskContext } from '../hooks/contexts/useSearchTask'

function SearchTasksInput() {
  const { searchValue, setSearchValue } = useSearchTaskContext()

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
