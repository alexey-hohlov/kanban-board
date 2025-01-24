import { useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AddIcon } from '@/assets';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { Button, BoardWrapper, Input } from '@/components';
import { validations } from '@/utils/validations';
import { generateId } from '@/utils/generateId';
import { IBoardForm } from '@/types/formTypes';
import { boardSlice } from '@/store/reducers/boardReducer';

const AddBoard: React.FC = () => {
  const { addBoard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const methods = useForm<IBoardForm>();
  const { reset, handleSubmit } = methods;

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const toggleAdding = () => {
    setIsAdding(prev => !prev);
  };

  const onSubmit: SubmitHandler<IBoardForm> = data => {
    dispatch(
      addBoard({
        title: data.boardTitle,
        description: data.boardDescription,
        id: generateId(),
        columns: [],
      })
    );
    toggleAdding();
    reset();
  };

  useEffect(() => {
    if (!isAdding) return;

    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        toggleAdding();
        reset();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [isAdding]);

  return isAdding ? (
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
              />
              <Input
                name={'boardDescription'}
                className='flex-grow'
                placeholder='Board Description'
              />
            </div>
            <div className='flex justify-center mt-3 gap-4'>
              <Button
                className='border-2 border-sky-500 flex-1 text-sky-400'
                title='Add'
              />
              <Button
                className='border-2 border-rose-500 text-rose-500 flex-1'
                title='Cancel'
                onClick={toggleAdding}
              />
            </div>
          </form>
        </FormProvider>
      </BoardWrapper>
    </div>
  ) : (
    <BoardWrapper className='cursor-pointer opacity-60 hover:opacity-100 hover:scale-105 transition select-none'>
      <div className='flex flex-col items-center h-full' onClick={toggleAdding}>
        <span className='text-2xl text-sky-400 font-bold'>Add Board</span>
        <div className='h-full flex items-center'>
          <AddIcon className='size-12' />
        </div>
      </div>
    </BoardWrapper>
  );
};

export default AddBoard;
