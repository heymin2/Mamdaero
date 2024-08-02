import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/RoundedButton';
const CounselorManageExclude = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  return (
    <div>
      <header className="flex justify-between py-10">
        <h1 className="text-black text-5xl font-bold">근무 예외 시간 관리</h1>
        <Button label=" 뒤로가기" size="lg" onClick={backToList} user="counselor" />
      </header>
      <div className="divider"></div>
    </div>
  );
};
export default CounselorManageExclude;
