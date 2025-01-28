import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Modal, TextArea } from '@/components';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { ITaskForm } from '@/types/formTypes';
import { validations } from '@/utils/validations';
import { boardSlice } from '@/store/reducers/boardReducer';
import { generateId } from '@/utils/generateId';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  columnId: string;
}

const AddTask: React.FC<Props> = ({ isOpen, onClose, columnId }) => {
  const { addTask } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const methods = useForm<ITaskForm>();
  const { reset, handleSubmit } = methods;

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    reset();
  };

  const onSubmit: SubmitHandler<ITaskForm> = data => {
    dispatch(
      addTask({
        columnId: columnId,
        task: {
          id: generateId(),
          title: data.taskTitle,
          content: data.taskContent,
        },
      })
    );
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className='bg-slate-950 shadow-xl rounded-xl p-4 flex flex-col gap-4 w-96'>
        <h3 className='text-2xl text-center text-sky-400 font-bold'>
          Add New Task
        </h3>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <Input
              name={'taskTitle'}
              rules={validations.required}
              placeholder={'Task Title'}
              autoFocus={true}
            />
            <TextArea
              name={'taskContent'}
              placeholder={'Task Content'}
              rows={10}
            />
            <div className='flex justify-center gap-4'>
              <Button
                title='Add'
                className='border-2 border-sky-500 flex-1 text-sky-400'
              />
              <Button
                onClick={handleCancel}
                title='Cancel'
                className='border-2 border-rose-500 flex-1 text-rose-500'
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default AddTask;
