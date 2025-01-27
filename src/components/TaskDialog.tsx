import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, FormLabel, styled, TextField } from '@mui/material';
import TagsInput from './TagsInput';
import { Task } from '../types/task';
import { Form, Formik, FormikHelpers } from 'formik';
import { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';

export interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task?: Task
}

type TaskFormField = Omit<Task, 'id' | 'isDone'>

const FormGrid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TaskDialog = ({ open, onClose, task }: TaskDialogProps) => {
  const { setTasks } = useContext(TasksContext);

  const onSubmit = (values: TaskFormField, actions: FormikHelpers<TaskFormField>) => {
    if (task) {
      setTasks(tasks => tasks.map((_task) => _task.id === task.id ? { ..._task, ...values } : _task));
    } else {
      setTasks(tasks => [...tasks, { ...values, id: Math.random().toString(), isDone: false }]);
    }

    onClose();
    actions.setSubmitting(false);
  }

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{task ? "Edit task" : "Add new task"}</DialogTitle>
        <DialogContent>
          <Formik initialValues={{
            description: task?.description || "",
            priority: task?.priority ?? 0,
            subjects: task?.subjects || [],
            dueDate: task?.dueDate?.slice(0, -1) || new Date().toISOString().slice(0, -1)
          }}
            onSubmit={onSubmit}
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
                  <TextField id="dueDate" name="dueDate" type="datetime-local"
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
