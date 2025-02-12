import { useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AddIcon } from '@/assets';
import { Button, ColumnWrapper, Input } from '@/components';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { IColumnForm } from '@/types/formTypes';
import { validations } from '@/utils/validations';
import { generateId } from '@/utils/generateId';
import { boardSlice } from '@/store/reducers/boardReducer';

const AddColumn: React.FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { addColumn } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const methods = useForm<IColumnForm>();
  const { reset, handleSubmit } = methods;

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    reset();
  };

  const onSubmit: SubmitHandler<IColumnForm> = data => {
    dispatch(
      addColumn({
        id: generateId(),
        title: data.columnTitle,
        tasks: [],
      })
    );
    setIsAdding(false);
    reset();
  };

  useEffect(() => {
    if (!isAdding) return;

    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsAdding(false);
        reset();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [isAdding]);

  return isAdding ? (
    <div ref={wrapperRef}>
      <ColumnWrapper className='h-full'>
        <FormProvider {...methods}>
          <form
            className='flex flex-col h-full justify-between'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name={'columnTitle'}
              rules={validations.required}
              placeholder={'Column Title'}
            />
            <div className='flex justify-center mt-3 gap-4'>
              <Button
                className='border-2 border-sky-500 flex-1 text-sky-400'
                title='Add'
              />
              <Button
                className='border-2 border-rose-500 text-rose-500 flex-1'
                title='Cancel'
                onClick={handleCancel}
              />
            </div>
          </form>
        </FormProvider>
      </ColumnWrapper>
    </div>
  ) : (
    <ColumnWrapper className='list-wrapper cursor-pointer opacity-60 select-none'>
      <div className='flex flex-col items-center h-full' onClick={handleAdd}>
        <span className='text-xl text-sky-400 font-bold'>Add Column</span>
        <div className='h-full flex items-center'>
          <AddIcon className='size-12' />
        </div>
      </div>
    </ColumnWrapper>
  );
};

export default AddColumn;
