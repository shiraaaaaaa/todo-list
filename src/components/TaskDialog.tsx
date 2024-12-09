import { useState } from 'react'

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, FormLabel, styled, TextField } from '@mui/material';
import TagsInput from './TagsInput';
import { Task } from '../types/task';
import { Form, Formik } from 'formik';

export interface TaskDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  task?: Task
}

const FormGrid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TaskDialog = ({ open, onClose, task }: TaskDialogProps) => {
  const onSubmit = (values: Task, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{task ? "Edit task" : "Add new task"}</DialogTitle>
        <DialogContent>
          <Formik initialValues={task || {
            description: "",
            priority: null,
            subjects: [],
            dueDate: ""
          }} onSubmit={onSubmit}
          >
            {props => (<Form onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}>

              <Box width="400px" display="flex" flexDirection="column" alignContent="center" gap="15px">
                <FormGrid >
                  <FormLabel htmlFor="description" required>
                    Task description
                  </FormLabel>
                  <TextField id="description" name="description" type="name" placeholder="Do homework"
                    required size="small" value={props.values.description} onChange={props.handleChange}
                  />
                </FormGrid>
                <FormGrid >
                  <FormLabel htmlFor="priority" required>
                    Priority
                  </FormLabel>
                  <TextField id="priority" name="priority" type="number"
                    required size="small" value={props.values.priority} onChange={props.handleChange}
                  />
                </FormGrid>
                <FormGrid >
                  <FormLabel htmlFor="tags" required>
                    Subjects
                  </FormLabel>

                  <TagsInput></TagsInput>
                </FormGrid>
                <FormGrid >
                  <FormLabel htmlFor="dueDate" required>
                    Duo date
                  </FormLabel>
                  <TextField id="dueDate" name="dueDate" type="date"
                    required size="small" value={props.values.dueDate} onChange={props.handleChange}
                  />
                </FormGrid>
                <Button type="submit" variant='outlined'>{task ? "save changes" : "submit"}</Button>

              </Box>
            </Form>)}
          </Formik>
        </DialogContent>

      </Dialog >
    </>
  )
}

export default TaskDialog
