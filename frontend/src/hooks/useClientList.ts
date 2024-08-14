import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import useAuthStore from '@/stores/authStore';

interface Client {
  id: number;
  name: string;
}

interface ClientListResponse {
  data: Client[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

const fetchClients = async (page: number, search: string, accessToken: string) => {
  const response = await axiosInstance.get<ClientListResponse>('c/client', {
    params: {
      page,
      search,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const useClientList = (page: number, search: string) => {
  const getAccessToken = useAuthStore(state => state.getAccessToken);
  const accessToken = getAccessToken();

  return useQuery<ClientListResponse, Error, ClientListResponse, QueryKey>({
    queryKey: ['clients', page, search],
    queryFn: () => fetchClients(page, search, accessToken || ''),
    enabled: !!accessToken,
    retry: 1,
    placeholderData: previousData => previousData,
  } as UseQueryOptions<ClientListResponse, Error, ClientListResponse, QueryKey>);
};

export default useClientList;
