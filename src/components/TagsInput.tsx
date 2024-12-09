import { KeyboardEvent, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export interface TagsInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    name: string
}


const TagsInput = ({ tags, setTags }: TagsInputProps) => {
    const [text, setText] = useState('');

    const handleRemoveTag = (index: number) => {
        setTags([...tags.filter((_tag, i) => i !== index)])
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && text.trim() !== '') {
            setTags([...tags, text.trim()]);
            setText('');
        }
    };

    return (
        <>
            <TextField
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"

            />
            <Box flexWrap="wrap" width="inherit">
                {tags.map((tag, index) => (
                    <Button
                        variant='outlined'
                        key={index}
                        onClick={() => handleRemoveTag(index)}

                    >
                        {tag}
                        <CloseIcon fontSize='small' />
                    </Button>
                ))}
            </Box>


        </>
    )
}

export default TagsInput
