import { useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiXCircle } from 'react-icons/fi';
import Button from '@/components/button/RoundedButton';

const CounselorManageTimePage = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  const chooseWeek = () => {
    console.log('요일 추가');
  };
  const addTime = () => {
    console.log('시간 추가 버튼');
  };
  const applyTime = () => {
    console.log('시간 적용하기');
  };

  return (
    <div>
      <header className="flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">상담 일정 관리</h1>
        <Button label=" 뒤로가기" size="md" onClick={backToList} user="counselor" />
      </header>
      <div className="divider"></div>
      <main className="flex justify-around">
        <section className="flex flex-col flex-wrap items-center gap-4 p-5 border border-blue-500 bg-blue-100 rounded-xl">
          <span className="box-border flex-1 font-bold">요일 선택</span>
          <button
            className="btn btn-circle bg-transparent border-orange-300 border-2"
            onClick={chooseWeek}
          >
            월
          </button>
          <button
            className="btn btn-circle bg-transparent border-orange-300 border-2"
            onClick={chooseWeek}
          >
            화
          </button>
          <button
            className="btn btn-circle bg-transparent border-white border-2"
            onClick={chooseWeek}
          >
            수
          </button>
          <button
            className="btn btn-circle bg-transparent border-gray-300 border-2"
            onClick={chooseWeek}
          >
            목
          </button>
          <button
            className="btn btn-circle bg-transparent border-orange-300 border-2"
            onClick={chooseWeek}
          >
            금
          </button>
          <button
            className="btn btn-circle bg-transparent border-gray-300 border-2"
            onClick={chooseWeek}
          >
            토
          </button>
          <button
            className="btn btn-circle bg-transparent border-gray-300 border-2"
            onClick={chooseWeek}
          >
            일
          </button>
        </section>
        <section>
          <span className="font-bold">시간 선택</span>
          <article className="flex flex-col gap-3 bg-blue-50 p-10 rounded-3xl border border-blue-500">
            <div className="bg-blue-200 border rounded-full font-bold box-content flex p-3 items-center justify-between">
              <button className="bg-white rounded-full text-bold px-1">09:00 </button>
              <span className="px-1">~</span>
              <button className="bg-white rounded-full px-1 text-bold">12:00 </button>
              <FiXCircle className="inline mx-1" />
            </div>
            <div className="bg-blue-200 border rounded-full font-bold box-content flex p-3 items-center justify-between">
              <button className="bg-white rounded-full text-bold px-1">09:00 </button>
              <span className="px-1">~</span>
              <button className="bg-white rounded-full px-1 text-bold">12:00 </button>
              <FiXCircle className="inline mx-1" />
            </div>
            <div className="bg-blue-200 border rounded-full font-bold box-content flex p-3 items-center justify-between">
              <button className="bg-white rounded-full text-bold px-1">09:00 </button>
              <span className="px-1">~</span>
              <button className="bg-white rounded-full px-1 text-bold">12:00 </button>
              <FiXCircle className="inline mx-1" />
            </div>

            {/* 시간 추가 버튼 */}
            <button className="bg-transparent mx-auto block" onClick={addTime}>
              <FiPlusCircle className="inline" />
              &nbsp;시간 추가
            </button>
          </article>
        </section>
        <span className="my-auto">
          <Button label="적용하기" user="counselor" onClick={applyTime} size="lg" />
        </span>
      </main>
    </div>
  );
};
export default CounselorManageTimePage;
