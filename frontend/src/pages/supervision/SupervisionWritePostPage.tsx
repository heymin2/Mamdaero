import RegisterBUtton from '@/components/button/RegisterButton';
import Editor from '@/components/Editor';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import { useNavigate } from 'react-router-dom';

const SupervisionWritePostPage = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/supervision');
  };
  return (
    <div>
      <div className="sticky top-0 z-10">
        <SupervisionBar />
        <div className="mx-24 text-right">
          <RegisterBUtton onClick={backToList} color="blue" />
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

export default SupervisionWritePostPage;
