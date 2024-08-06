import RegisterBUtton from '@/components/button/RegisterButton';
import Editor from '@/components/Editor';
import CommunityBar from '@/components/navigation/CommunityBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const CommunityWritePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 제목 입력 핸들러
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // 에디터 내용 핸들러
  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  // 게시글 작성 핸들러
  const handleSubmit = async () => {
    // 제목과 내용이 비어 있는지 확인
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }
  };
  return (
    <div>
      <div className="sticky top-0 z-10">
        <CommunityBar />
        <div className="mx-24 text-right">
          {/* <RegisterBUtton onClick={handleSubmit} color="orange" /> */}
        </div>
      </div>
      <div className="mx-24 my-6">
        <input
          placeholder="제목을 입력해 주세요."
          className="w-full px-6 h-16 large-placeholder"
        ></input>
        <Editor value={content} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default CommunityWritePostPage;
