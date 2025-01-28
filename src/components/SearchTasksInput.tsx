import { useContext, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { SearchTaskContext } from '../contexts/SearchTaskContext';

function SearchTasksInput() {
    const { setSearchValue } = useContext(SearchTaskContext);
    const [text, setText] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchValue(text)
        }, 1000)

        return () => clearTimeout(timer)
    }, [text, setSearchValue])


    return (
        <TextField placeholder='search...' onChange={e => setText(e.target.value)} > </TextField>
    )
}

export default SearchTasksInput
