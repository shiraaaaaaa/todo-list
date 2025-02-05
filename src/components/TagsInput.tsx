import { KeyboardEvent, useState } from 'react'
import { Box, Button, styled, TextField } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import { useFormikContext } from 'formik'
import { Task } from '../types/task'

export interface TagsInputProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  name: string
}

const SubjectButton = styled(Button)(() => ({
  margin: '1px',
  fontSize: '10px',
  padding: '4px',
}))

const TagsInput = () => {
  const { values, setFieldValue } = useFormikContext<Task>()
  const [text, setText] = useState('')

  const handleRemoveTag = (index: number) => {
    setFieldValue('subjects', [...values.subjects.filter((_tag, i) => i !== index)])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      setFieldValue('subjects', [...values.subjects, text.trim()])
      setText('')
    }
  }

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
        {values.subjects.map((tag, index) => (
          <SubjectButton variant="contained" key={index} onClick={() => handleRemoveTag(index)}>
            {tag}
            <CloseIcon fontSize="small" />
          </SubjectButton>
        ))}
      </Box>
    </>
  )
}

export default TagsInput
