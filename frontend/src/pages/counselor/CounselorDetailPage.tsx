import DefaultProfile from '@/assets/DefaultProfile.jpg';
import ReviewCard from '@/components/card/ReviewCard';
import SquareButton from '@/components/button/SquareButton';
import RoundedButton from '@/components/button/RoundedButton';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaStar } from 'react-icons/fa6';

// interface CounselorDetailProps {
//   name: string;
//   intro: string;
//   introDetail: string;
//   profileImage: string;
//   reviewCount: number;
// }
// const CounselorDetailPage: React.FC<CounselorDetailProps> = ({
//   name = '박민준',
//   intro = '똑똑똑, 당신의 이야기를 경청하며, 내면의 힘을 키워나가는 박민준 상담사입니다.',
//   introDetail = ' 상담을 통해 현재의 어려움을 다른 관점으로 바라볼 수 있게 되기도 하고, 문제를 다룰 수 있는 내적인 힘이 생기기도 한답니다. 왜냐하면 머릿속에서 과거와 현재의 경험, 여러 감정들이 서로 복잡하게 엉켜 있어 명료하게 바라볼 수 없었던 것들이 상담 과정에서 하나씩 이해되고 정리되며 어려웠던 감정은 치유될 수 있기 때문이지요. ',
//   profileImage = DefaultProfile,
//   reviewCount = 5,
// }) => {
const CounselorDetailPage = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/counselor');
  };
  const name = '박민준';
  const intro = '나만의 삶의 의미를 찾는 여정을 함께해요.';
  const introDetail =
    ' 상담을 통해 현재의 어려움을 다른 관점으로 바라볼 수 있게 되기도 하고, 문제를 다룰 수 있는 내적인 힘이 생기기도 한답니다. 왜냐하면 머릿속에서 과거와 현재의 경험, 여러 감정들이 서로 복잡하게 엉켜 있어 명료하게 바라볼 수 없었던 것들이 상담 과정에서 하나씩 이해되고 정리되며 어려웠던 감정은 치유될 수 있기 때문이지요. ';
  const profileImage = DefaultProfile;
  const reviewCount = 5;
  const { counselorId } = useParams<{ counselorId: string }>();
  return (
    <div className="my-3 mx-24">
      <div className="mb-3">
        <RoundedButton
          label={
            <span className="flex items-center ms-2">
              <IoIosArrowBack />
              <div className="ms-2 mt-0.5">상담사 목록 보기</div>
            </span>
          }
          onClick={backToList}
          size="상담사목록보기"
          user="client"
        ></RoundedButton>
      </div>
      <div className="grid grid-cols-4">
        {/* 왼쪽 부분 (상담사 소개) */}
        <div className="col-span-3">
          {/* 한줄 소개 */}
          <div className="text-2xl font-bold max-w-2xl my-4">{intro}</div>
          {/* 상담사 상세 소개 */}
          <div>
            <div className="flex">
              <div className="text-xl font-bold border-b-4 mt-8 border-b-orange-400">
                상담사 소개
              </div>
            </div>
            <div className="text-base max-w-2xl my-4">{introDetail}</div>
          </div>
          {/* 리뷰 */}
          <div className="flex">
            <div className=" flex items-end font-bold border-b-4 mt-8 border-b-orange-400">
              <div className="text-orange-500 text-xl ">{reviewCount}개</div>
              <div className="text-base">의 리뷰가 있습니다.</div>
            </div>
          </div>
          {/* 리뷰 컴포넌트 */}
          <div className="grid grid-cols-2 gap-6 my-4 pe-6">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
        {/* 오른쪽 부분 (이름, 이미지, 예약하기 버튼) */}
        <div className="col-span-1 mx-2">
          <div className="sticky top-20 overflow-auto">
            <img src={DefaultProfile} className="w-full h-64 object-cover rounded-lg" alt="" />
            <div className="flex my-4 justify-start">
              <div className="flex items-end">
                <div className="text-2xl font-bold">{name}</div>
                <div className="text-base font-bold ml-2">상담사</div>
                <div className="flex ms-1">
                  <FaStar size={20} color="orange" className="ms-1" />
                  <div className="text-md font-bold mx-1">4.5</div>
                </div>
              </div>
            </div>
            <div>
              <SquareButton
                label="예약하기"
                onClick={() => {
                  navigate(`/counselor/${counselorId}/reservation`);
                }}
                size="예약하기"
                user="client"
              ></SquareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDetailPage;
