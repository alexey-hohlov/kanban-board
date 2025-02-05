import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { IBoardForm } from '@/types/formTypes';
import { validations } from '@/utils/validations';
import { Button, Input, Modal, TextArea } from '@/components';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface Props {
  title: string;
  description: string;
  onClose: () => void;
  isOpen: boolean;
}

const EditBoard: React.FC<Props> = ({
  title,
  description,
  onClose,
  isOpen,
}) => {
  const { editBoard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const methods = useForm<IBoardForm>();
  const { reset, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<IBoardForm> = data => {
    dispatch(
      editBoard({ title: data.boardTitle, description: data.boardDescription })
    );
    onClose();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    reset();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <h3 className='text-2xl text-center text-sky-400 font-bold line-clamp-1'>
        {title}
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Input
            name={'boardTitle'}
            rules={validations.required}
            placeholder={'Board Title'}
            defaultValue={title}
            autoFocus={true}
          />
          <TextArea
            name={'boardDescription'}
            rules={validations.required}
            placeholder={'Board Description'}
            rows={10}
            defaultValue={description}
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
    </Modal>
  );
};

export default EditBoard;
