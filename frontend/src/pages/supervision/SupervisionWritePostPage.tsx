import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Editor from '@/components/Editor';
import RegisterButton from '@/components/button/RegisterButton';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '@/components/button/Button';

interface PostArticleResponse {
  id: number;
  title: string;
  content: string;
  file?: string;
}

interface PostData {
  title: string;
  content: string;
  file?: File;
}

const SupervisionWritePostPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPageModified, setIsPageModified] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPageModified) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPageModified]);

  useEffect(() => {
    setIsPageModified(title.trim() !== '' || content.trim() !== '' || file !== null);
  }, [title, content, file]);

  const backToList = () => {
    if (isPageModified && !window.confirm('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?')) {
      return;
    }
    navigate('/supervision');
  };

  const postArticleMutation = useMutation({
    mutationFn: async (postData: PostData): Promise<PostArticleResponse> => {
      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
      if (postData.file) {
        formData.append('file', postData.file);
      }

      const response = await axiosInstance({
        method: 'post',
        url: 'c/counselor-board',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      setIsPageModified(false);
      queryClient.invalidateQueries({ queryKey: ['supervisionPosts'] });
      navigate('/supervision');
    },
    onError: (error: unknown) => {
      alert(`오류가 발생했습니다. ${error}`);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    const postData: PostData = {
      title,
      content,
      file: file || undefined,
    };

    postArticleMutation.mutate(postData);
  };

  return (
    <div>
      <div className="sticky bg-blue-50 top-0 z-10">
        <div className="flex justify-between items-end ms-28">
          <div className="mb-3">
            <Button
              label={
                <span className="flex items-center ms-2">
                  <IoIosArrowBack />
                  <div className="ms-2 mt-0.5">게시글 목록 보기</div>
                </span>
              }
              onClick={backToList}
              size="목록보기"
              textSize="sm"
              shape="rounded"
              color="blue"
            />
          </div>
          <SupervisionBar />
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
        <div className="flex justify-between">
          <input className="file-input h-9 mt-4" type="file" onChange={handleFileChange} />
          <div className="m-6">
            <RegisterButton
              onClick={handleSubmit}
              disabled={postArticleMutation.isPending}
              color="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionWritePostPage;
