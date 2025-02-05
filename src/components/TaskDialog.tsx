import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, FormLabel, styled, TextField } from '@mui/material';
import TagsInput from './TagsInput';
import { Task } from '../types/task';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAtom } from 'jotai';
import { addTaskAtom, updateTaskAtom } from '../atoms/tasksAtom';
import MapPointInput from './MapPointInput';


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
  const [, updateTask] = useAtom(updateTaskAtom)
  const [, addTask] = useAtom(addTaskAtom)



  const onSubmit = (values: TaskFormField, actions: FormikHelpers<TaskFormField>) => {
    if (task) {
      updateTask(task.id, values);
    } else {
      addTask({ ...values, id: Math.random().toString(), isDone: false });
    }

    onClose();
    actions.setSubmitting(false);
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{task ? "Edit task" : "Add new task"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            description: task?.description || "",
            priority: task?.priority ?? 0,
            subjects: task?.subjects || [],
            dueDate: task?.dueDate?.slice(0, 16) || "",
            coordinates: task?.coordinates || [34.79328939921442, 32.07732843041701]
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
                <TextField id="priority" name="priority" type="number" slotProps={{ htmlInput: { min: 1, max: 10 } }}
                  required size="small" value={props.values.priority} onChange={props.handleChange}
                />
              </FormGrid>
              <FormGrid >
                <FormLabel htmlFor='subjects'>
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
              <MapPointInput />
              <Button type="submit" variant='outlined'>{task ? "save changes" : "submit"}</Button>
            </Box>
          </Form>)}
        </Formik>
      </DialogContent>
    </Dialog >
  )
}

export default TaskDialog
