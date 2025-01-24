import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { validations } from '@/utils/validations';
import { ITaskForm } from '@/types/formTypes';
import { Button, Input, TextArea } from '@/components';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface Props {
  title: string;
  content: string;
  taskId: string;
  columnId: string;
  onClose: () => void;
}

const EditTask: React.FC<Props> = ({
  title,
  content,
  taskId,
  columnId,
  onClose,
}) => {
  const { editTask } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const methods = useForm<ITaskForm>();
  const { reset, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<ITaskForm> = data => {
    dispatch(
      editTask({
        columnId: columnId,
        taskId: taskId,
        task: {
          title: data.taskTitle,
          content: data.taskContent,
        },
      })
    );
    onClose();
    reset();
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-2xl text-center text-sky-400 font-bold line-clamp-1'>
        {title}
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Input
            name={'taskTitle'}
            rules={validations.required}
            placeholder={'Task Title'}
            defaultValue={title}
          />
          <TextArea
            name={'taskContent'}
            placeholder={'Task Content'}
            rows={10}
            defaultValue={content}
          />
          <div className='flex justify-center gap-4'>
            <Button
              title='Save'
              className='border-2 border-sky-500 flex-1 text-sky-400'
              disabled={!formState.isDirty}
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
  );
};

export default EditTask;
