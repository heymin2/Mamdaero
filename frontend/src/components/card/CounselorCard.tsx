import { Link } from 'react-router-dom';
import DefaultProfile from '@/assets/DefaultProfile.jpg';
const CounselorCard = () => {
  const counselorID = '1234';
  const counselorName = '박민준';
  const counselorIntro = '안녕하세요. 박민준 상담사 입니다. 안녕하세요.';
  const counselorImage = '';

  return (
    <div className="border-b-2 border-b-gray-300">
      <div className="w-full p-6 grid grid-cols-5">
        <div className="col-span-4 flex flex-col">
          <div className="text-2xl font-bold">{counselorName}</div>
          <div className="text-md mt-3">{counselorIntro}</div>
          <div className="mt-auto">
            <Link to={`/counselor/${counselorID}`} className="text-orange-400 font-bold">
              상담사 프로필 보기
            </Link>
          </div>
        </div>

        <div className="col-span-1 flex justify-end items-start">
          <img src={DefaultProfile} className="w-32 h-40 object-cover rounded-lg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CounselorCard;
