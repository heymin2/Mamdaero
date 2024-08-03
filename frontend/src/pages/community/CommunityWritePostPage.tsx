import RegisterBUtton from '@/components/button/RegisterButton';
import Editor from '@/components/Editor';
import CommunityBar from '@/components/navigation/CommunityBar';
import { useNavigate } from 'react-router-dom';

const CommunityWritePostPage = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/community');
  };
  return (
    <div>
      <div className="sticky top-0 z-10">
        <CommunityBar />
        <div className="mx-24 text-right">
          <RegisterBUtton onClick={backToList} color="orange" />
        </div>
      </div>
      <div className="mx-24 my-6">
        <input
          placeholder="제목을 입력해 주세요."
          className="w-full px-6 h-16 large-placeholder"
        ></input>
        <Editor />
      </div>
    </div>
  );
};

export default CommunityWritePostPage;
