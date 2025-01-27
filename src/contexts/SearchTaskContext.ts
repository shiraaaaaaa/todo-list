import { createContext } from 'react';

interface SearchTaskContextData {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchTaskContext = createContext<SearchTaskContextData>({ searchValue: "", setSearchValue: () => { } });