import { FiEdit3 } from 'react-icons/fi';

interface ButtonProps {
  onClick: () => void;
  color: 'blue' | 'orange' | 'gray';
}

const WriteButton = ({ onClick, color }: ButtonProps) => {
  const colorClasses = {
    blue: 'bg-blue-200 hover:bg-blue-300',
    orange: 'bg-orange-200 hover:bg-orange-300',
    gray: 'bg-gray-200 hover:bg-gray-300',
  };
  return (
    <div>
      <button onClick={onClick} className={`rounded-md ${colorClasses[color]}`}>
        <div className="flex font-bold text-sm items-center my-1 mx-3 gap-2">
          <FiEdit3 size={18} />
          글쓰기
        </div>
      </button>
    </div>
  );
};

export default WriteButton;
