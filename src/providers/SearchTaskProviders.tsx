import { useState } from 'react'
import { SearchTaskContext } from '../contexts/SearchTaskContext'

export default function SearchTaskProvider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <SearchTaskContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchTaskContext.Provider>
  )
}
