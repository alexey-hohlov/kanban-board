import { AddBoard, BoardItem } from '@/components';
import { useAppSelector } from '@/hooks/reduxHooks';

const SelectPage: React.FC = () => {
  const { boardIds, boards } = useAppSelector(state => state.boardReducer);
  return (
    <section className='flex flex-col gap-4'>
      <h3 className='text-3xl text-sky-400 font-bold'>Select a board or create a new one</h3>
      <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
        {boardIds.map(id => (
          <BoardItem key={id} board={boards[id]} />
        ))}
        <AddBoard />
      </ul>
    </section>
  );
};

export default SelectPage;
