import { useContext } from 'react'

import { SearchTaskContext, SearchTaskContextData } from '../../contexts/SearchTaskContext'

const defaultValue = {}

export const useSearchTaskContext = (): SearchTaskContextData => {
  const contextValue = useContext(SearchTaskContext)

  if (contextValue === undefined) {
    throw new Error('useSearchTaskContext can not be called outside of SearchTaskProvider!')
  }

  return contextValue || defaultValue
}
