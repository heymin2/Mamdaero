import axiosInstance from './axiosInstance';

export const getQuestion = async () => {
  const res = await axiosInstance({
    url: '/p/question',
    method: 'GET',
  });
  return res.data;
};

export const getPostits = async ({ questionId, page }: { questionId: number; page: number }) => {
  const response = await axiosInstance({
    url: `/p/postit/${questionId}`,
    method: 'GET',
    params: { page },
  });

  return response.data;
};

export const createPostit = ({ questionId, content }: { questionId: number; content: string }) => {
  return axiosInstance({
    url: `/cm/postit/${questionId}`,
    method: 'POST',
    data: { content },
  });
};

export const updatePostit = ({ postitId, content }: { postitId: number; content: string }) => {
  return axiosInstance({
    url: `/cm/postit/${postitId}`,
    method: 'PUT',
    data: { content },
  });
};

export const deletePostit = (postitId: number) => {
  return axiosInstance({
    url: `/cma/postit/${postitId}`,
    method: 'DELETE',
  });
};

export const likePostit = (postitId: number) => {
  return axiosInstance({
    url: `/cm/postit/${postitId}/like`,
    method: 'POST',
  });
};

export const complaintPostit = (postitId: number) => {
  return axiosInstance({
    url: `/cm/postit/${postitId}/complaint`,
    method: 'POST',
  });
};
