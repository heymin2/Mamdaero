import { FaStar } from 'react-icons/fa6';

const ReviewCard = () => {
  const reviewContent =
    '이별에 관하여 상담을 해주셨는데 내가 모르던 나의 심리를 파악하게 해주시고 연애 시 갈등 관리법에 대하여 적절한 조언을 해주심';
  return (
    <div className="w-full p-4 bg-orange-100 rounded-md shadow-md">
      <div className="flex mb-1">
        <FaStar size={20} color="orange" />
        <div className="text-md font-bold mx-1">4.5</div>
      </div>
      <div>{reviewContent}</div>
    </div>
  );
};

export default ReviewCard;
