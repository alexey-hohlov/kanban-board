import { useEffect, useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { BoardWrapper, Input, Button } from '@/components';
import { IBoardForm } from '@/types/formTypes';
import { validations } from '@/utils/validations';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface Props {
  isEditing: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const EditBoardItem: React.FC<Props> = ({
  isEditing,
  onClose,
  title,
  description,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const methods = useForm<IBoardForm>();
  const { reset, handleSubmit } = methods;
  const { editBoard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IBoardForm> = data => {
    dispatch(
      editBoard({ title: data.boardTitle, description: data.boardDescription })
    );
    reset();
    onClose();
  };

  useEffect(() => {
    if (!isEditing) return;

    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        onClose();
        reset();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [isEditing]);

  return (
    <div ref={wrapperRef}>
      <BoardWrapper>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col h-full'
          >
            <div className='flex flex-col gap-2 flex-grow'>
              <Input
                name={'boardTitle'}
                rules={validations.required}
                placeholder='Board Title'
                defaultValue={title}
              />
              <Input
                name={'boardDescription'}
                className='flex-grow'
                placeholder='Board Description'
                defaultValue={description}
              />
            </div>
            <div className='flex justify-center mt-3 gap-4'>
              <Button
                className='border-2 border-sky-500 flex-1 text-sky-400'
                title='Save'
              />
              <Button
                className='border-2 border-rose-500 text-rose-500 flex-1'
                title='Cancel'
                onClick={onClose}
              />
            </div>
          </form>
        </FormProvider>
      </BoardWrapper>
    </div>
  );
};

export default EditBoardItem;
