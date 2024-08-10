import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

const CommunityPostCard = () => {
  const title = '최근의 기분 변화와 그에 대한 고민';
  const author = '미래의 꿈';
  const date = '2024.7.21 (토) 12:24';
  const viewCount = 34;
  const likeCount = 11;
  const commentCount = 12;
  const content = `안녕하세요,
  
  최근 몇 주 동안 기분의 변화가 심해서 많이 고민하고 있습니다.
  평소에는 꽤 긍정적이고 활기찬 편이었는데, 요즘 들어 자주 무기력하고 우울한 기분이 드는 것 같아요.
  작은 일에도 쉽게 짜증이 나고, 하루를 보내는 게 힘들게 느껴질 때가 많습니다.
  
  이러한 기분 변화의 원인을 잘 모르겠고, 어떻게 대응해야 할지 고민이 많습니다.
  혹시 비슷한 경험이 있으신 분이 계신가요? 
  여러분은 이러한 기분 변화를 어떻게 다루시나요? 
  
  혹시 도움이 될 만한 방법이나 팁이 있다면 나눠주시면 감사하겠습니다.
  감사합니다.
    최근 몇 주 동안 기분의 변화가 심해서 많이 고민하고 있습니다.
  평소에는 꽤 긍정적이고 활기찬 편이었는데, 요즘 들어 자주 무기력하고 우울한 기분이 드는 것 같아요.
  작은 일에도 쉽게 짜증이 나고, 하루를 보내는 게 힘들게 느껴질 때가 많습니다.
  
  이러한 기분 변화의 원인을 잘 모르겠고, 어떻게 대응해야 할지 고민이 많습니다.
  혹시 비슷한 경험이 있으신 분이 계신가요? 
  여러분은 이러한 기분 변화를 어떻게 다루시나요? 
  
  혹시 도움이 될 만한 방법이나 팁이 있다면 나눠주시면 감사하겠습니다.
  감사합니다.`;
  return (
    <div className="space-y-3">
      {/* 게시글 제목 헤더 */}
      <div className=" border-y-2 border-orange-300 p-5">
        <h1 className="font-bold text-3xl">{title}</h1>
        <div className="flex justify-between items-end mt-3">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-gray-400 me-2">글쓴이</span>
              <span className="font-bold">{author}</span>
            </div>
            <div className="flex">
              <span className="text-gray-400 me-2">일시</span>
              <span className="font-bold">{date}</span>
              <span className="text-gray-400 mx-5 me-2">조회수</span>
              <span className="font-bold">{viewCount}</span>
            </div>
          </div>
          <div className="justify-end">
            <div className="flex  gap-2">
              <EditButton color="orange" onClick={() => {}} />
              <DeleteButton onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
      {/* 게시글 내용 */}
      <div className="relative border-y-2 border-orange-300 p-10">
        <div className="whitespace-pre-wrap">{content}</div>
        <div className="absolute bottom-3 right-5 flex text-base gap-1 p-2">
          <IoMdHeartEmpty size={24} color="red" />
          <IoMdHeart size={24} color="red" />
          <div className="font-semibold">좋아요</div>
          <div className="font-bold">{likeCount}</div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;
