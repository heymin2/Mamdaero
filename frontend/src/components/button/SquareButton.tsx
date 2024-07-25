interface ButtonProps {
  label: string;
  onClick: () => void;
  size: 'sm' | 'md' | 'lg' | 'full';
  user: 'counselor' | 'client' | 'common';
}

const Button = ({ label, onClick, size, user }: ButtonProps) => {
  const sizeClasses = {
    sm: 'w-20 h-7 text-sm font-bold',
    md: 'w-24 h-9 text-base font-bold',
    lg: 'w-40 h-10 text-xl font-bold',
    full: 'my-2 w-full h-10 text-xl font-bold',
  };

  const userClasses = {
    counselor: 'bg-blue-200',
    client: 'bg-orange-200',
    common: 'bg-gray-200',
  };

  return (
    <button onClick={onClick} className={`rounded-md ${sizeClasses[size]} ${userClasses[user]}`}>
      {label}
    </button>
  );
};

export default Button;
