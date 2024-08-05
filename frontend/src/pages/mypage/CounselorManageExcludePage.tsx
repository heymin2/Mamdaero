import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
const CounselorManageExcludePage = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">근무 예외 시간 관리</h1>
        <Button label=" 뒤로가기" shape="rounded" onClick={backToList} color="blue" />
      </header>
      <div className="divider"></div>
      <main className="flex gap-10 justify-around">
        <section>달력</section>
        <section>시간 선택</section>
      </main>
    </>
  );
};
export default CounselorManageExcludePage;
