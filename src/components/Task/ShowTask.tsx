import { EditIcon } from '@/assets';
import { Button } from '@/components';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { uiSlice } from '@/store/reducers/uiReducer';

interface Props {
  title: string;
  content: string;
}

const ShowTask: React.FC<Props> = ({ title, content }) => {
  const { setIsEditing } = uiSlice.actions;
  const dispatch = useAppDispatch();
  const handleEditing = () => {
    dispatch(setIsEditing(true));
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h3 className='text-2xl text-sky-400 font-bold line-clamp-1'>{title}</h3>
        <Button onClick={handleEditing}>
          <EditIcon className='opacity-70' />
        </Button>
      </div>
      {content.length ? <p className='bg-slate-900 p-2 rounded-xl min-h-40 max-h-96 overflow-y-auto break-words'>
        {content}
      </p> : <span className='text-center font-bold text-2xl text-slate-700'>(empty)</span>}
      
    </div>
  );
};

export default ShowTask;
