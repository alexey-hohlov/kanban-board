import { Button, Modal } from '@/components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  itemName: string;
}

const WarningModal: React.FC<Props> = ({
  onClose,
  isOpen,
  itemName,
  handleDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col gap-4'>
        <h3 className='text-2xl text-center text-rose-500 font-bold'>
          Warning!
        </h3>
        <div className='flex flex-col gap-2 bg-slate-800 rounded-xl p-4'>
          <div className='flex items-center text-center'>
            <div className='overflow-hidden whitespace-nowrap text-ellipsis'>
              Are you sure you want to delete{' '}
              <span className='text-sky-400 font-bold'>{itemName}</span>
            </div>
            ?
          </div>
          <div className='text-center'>
            This item will be deleted{' '}
            <span className='text-rose-500 font-bold'>immediately</span>
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <Button
            className='border-2 border-sky-500 flex-1 text-sky-400'
            title='Delete'
            onClick={handleDelete}
          />
          <Button
            className='border-2 border-rose-500 text-rose-500 flex-1'
            title='Cancel'
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
