interface ButtonProps {
  onClick: () => void;
  color: 'blue' | 'orange' | 'gray';
  disabled: boolean;
}

const RegisterBUtton = ({ onClick, color, disabled }: ButtonProps) => {
  const colorClasses = {
    blue: 'bg-blue-200 hover:bg-blue-300',
    orange: 'bg-orange-200 hover:bg-orange-300',
    gray: 'bg-gray-200 hover:bg-gray-300',
  };
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div>
      <button
        onClick={onClick}
        className={`rounded-md ${colorClasses[color]} ${disabledClass}`}
        disabled={disabled}
      >
        <div className="flex font-bold text-md items-center my-1 mx-3 gap-2">등록하기</div>
      </button>
    </div>
  );
};

export default RegisterBUtton;
