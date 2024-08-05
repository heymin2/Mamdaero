import React, { useState } from 'react';
import RegisterButton from '@/components/button/RegisterButton';
import Editor from '@/components/Editor';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SupervisionWritePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 파일 입력 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]); // FileList에서 첫 번째 파일만 설정
    }
  };

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
    setIsLoading(true);

    const postData = {
      title,
      content,
    };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }

    console.log('Form data:', formData);
    try {
      const response = await axios.post('https://mamdaero.o-r.kr/api/c/counselor-board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 게시글 작성
      console.log('success:', response.data);
      navigate('/supervision');
    } catch (error) {
      // 에러
      console.error('error:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-10">
        <SupervisionBar />
        <div className="mx-24 text-right">
          <RegisterButton onClick={handleSubmit} color="blue" />
        </div>
      </div>
      <div className="mx-24 my-6">
        <input
          placeholder="제목을 입력해 주세요."
          className="w-full px-6 h-16 large-placeholder"
          value={title}
          onChange={handleTitleChange}
        />
        <Editor value={content} onChange={handleEditorChange} />
        <input className="file-input mt-4" type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default SupervisionWritePostPage;
