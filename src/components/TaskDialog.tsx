import { useState } from 'react'

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, FormLabel, styled, TextField } from '@mui/material';
import TagsInput from './TagsInput';
import { Task } from '../types/task';


export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  task?: Task
}

const FormGrid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TaskDialog = ({ open, onClose, task }: SimpleDialogProps) => {
  const [subjects, setSubjects] = useState<string[]>(task ? task.subjects : [])
  const [description, setDescription] = useState<string | null>(task ? task.description : null)
  const [priority, setPriority] = useState<number | null>(task ? task.priority : null)
  const [dueDate, setDueDate] = useState<Date | null>(task ? task.dueDate : null)
  

  return (
    <>
      <Dialog onClose={onClose} open={open}>

        <DialogTitle>{task ? "Edit task" : "Add new task"}</DialogTitle>
        <DialogContent>

          <Box width="400px" display="flex" flexDirection="column" alignContent="center" gap="15px">
            <FormGrid >
              <FormLabel htmlFor="description" required>
                Task description
              </FormLabel>
              <TextField
                id="description"
                name="description"
                type="name"
                placeholder="Do homework"
                required
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGrid>
            <FormGrid >
              <FormLabel htmlFor="priority" required>
                Priority
              </FormLabel>
              <TextField
                id="priority"
                name="priority"
                type="number"
                required
                size="small"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              />
            </FormGrid>
            <FormGrid >
              <FormLabel htmlFor="tags" required>
                Subjects
              </FormLabel>

              <TagsInput tags={subjects} setTags={setSubjects} name="tags"></TagsInput>
            </FormGrid>
            <FormGrid >
              <FormLabel htmlFor="due-date" required>
                Duo date
              </FormLabel>
              <TextField
                id="due-date"
                name="due-date"
                type="date"
                required
                size="small"
                value={dueDate}
                onChange={(e) => setDueDate(new Date(e.target.value))}
              />
            </FormGrid>
            <Button sx={{ marginTop: "15px" }} variant='outlined' onClick={() => onClose('save')}>{task ? "save changes" : "submit"}</Button>
          </Box>
        </DialogContent>

      </Dialog >
    </>
  )
}

export default TaskDialog
