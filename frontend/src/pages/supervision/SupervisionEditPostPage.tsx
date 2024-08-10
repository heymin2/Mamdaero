import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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

// 기존 게시글 가져오기
const fetchPostDetail = async (supervisionId: number): Promise<PostArticleResponse> => {
  const response = await axiosInstance({
    method: 'get',
    url: `ca/counselor-board/${supervisionId}`,
  });
  return response.data;
};

// 게시글 수정
const updateArticle = async (
  supervisionId: number,
  postData: PostData
): Promise<PostArticleResponse> => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
  if (postData.file) {
    formData.append('file', postData.file);
  }

  const response = await axiosInstance({
    method: 'patch',
    url: `c/counselor-board/${supervisionId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const SupervisionEditPostPage: React.FC = () => {
  const { supervisionId: postIdString } = useParams<{ supervisionId: string }>();
  const supervisionId = postIdString ? parseInt(postIdString, 10) : undefined;
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const backToList = () => {
    navigate('/supervision');
  };

  const { data: postData } = useQuery<PostArticleResponse, AxiosError>({
    queryKey: ['PostData', supervisionId],
    queryFn: () => fetchPostDetail(supervisionId!),
    enabled: supervisionId !== undefined,
  });

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setContent(postData.content);
    }
  }, [postData]);

  const mutation = useMutation<PostArticleResponse, AxiosError, PostData>({
    mutationFn: (data: PostData) => {
      if (supervisionId === undefined) throw new Error('Post ID is missing');
      return updateArticle(supervisionId, data);
    },
    onSuccess: () => {
      navigate('/supervision');
    },
    onError: (error: AxiosError) => {
      alert(`오류가 발생했습니다. ${error.message}`);
    },
  });

  // 파일 입력 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
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

    mutation.mutate(postData);
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
            <RegisterButton onClick={handleSubmit} disabled={mutation.isPending} color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionEditPostPage;
