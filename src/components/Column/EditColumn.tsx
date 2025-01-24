import { useEffect, useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, ColumnWrapper, Input } from '@/components';
import { IColumnForm } from '@/types/formTypes';
import { validations } from '@/utils/validations';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface Props {
  onClose: () => void;
  isEditing: boolean;
  title: string;
  columnId: string;
}

const EditColumn: React.FC<Props> = ({
  onClose,
  isEditing,
  title,
  columnId,
}) => {
  const { editColumn } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const methods = useForm<IColumnForm>();
  const { handleSubmit, reset, formState } = methods;
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const onSubmit: SubmitHandler<IColumnForm> = data => {
    dispatch(
      editColumn({
        columnId: columnId,
        title: data.columnTitle,
      })
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
    <div ref={wrapperRef} className='h-min' data-no-dnd>
      <ColumnWrapper>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2 h-full justify-between'
          >
            <Input
              name={'columnTitle'}
              rules={validations.required}
              placeholder={'Column Title'}
              defaultValue={title}
            />
            <div className='flex justify-center mt-3 gap-4'>
              <Button
                className='border-2 border-sky-500 flex-1 text-sky-400'
                title='Save'
                disabled={!formState.isDirty}
              />
              <Button
                className='border-2 border-rose-500 text-rose-500 flex-1'
                title='Cancel'
                onClick={onClose}
              />
            </div>
          </form>
        </FormProvider>
      </ColumnWrapper>
    </div>
  );
};

export default EditColumn;
