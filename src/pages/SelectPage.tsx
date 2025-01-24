import { AddBoard, BoardItem } from '@/components';
import { useAppSelector } from '@/hooks/reduxHooks';

const SelectPage: React.FC = () => {
  const { boardIds, boards } = useAppSelector(state => state.boardReducer);
  return (
    <section>
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
