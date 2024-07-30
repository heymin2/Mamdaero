interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  size: 'sm' | 'md' | 'lg' | 'full' | '상담사목록보기';
  user: 'counselor' | 'client' | 'common';
}
const Button = ({ label, onClick, size, user }: ButtonProps) => {
  const sizeClasses = {
    sm: 'w-20 h-7 text-sm font-bold',
    md: 'w-24 h-9 text-base font-bold',
    lg: 'w-40 h-10 text-xl font-bold',
    full: 'w-full h-10 text-xl font-bold',
    상담사목록보기: 'w-36 h-8 text-sm font-bold',
  };

  const userClasses = {
    counselor: 'bg-blue-200 hover:bg-blue-300',
    client: 'bg-orange-200 hover:bg-orange-300 transition',
    common: 'bg-gray-200 hover:bg-gray-300',
  };

  return (
    <button onClick={onClick} className={`rounded-full ${sizeClasses[size]} ${userClasses[user]}`}>
      {label}
    </button>
  );
};

export default Button;
