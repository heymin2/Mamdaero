import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DefaultProfile from '@/assets/DefaultProfile.jpg';
import Button from '@/components/button/Button';
import axiosInstance from '@/api/axiosInstance';

interface Product {
  counselorItemId: number;
  name: string;
  fee: number;
  description: string;
}

interface ReservationData {
  workTimeId: number;
  situationIds: number[];
  symptomIds: number[];
  isDiaryShared: boolean;
  isTestShared: boolean;
  requirement: string;
  counselorItemId?: number;
}

interface CounselorSidebarProps {
  username: string;
  counselorId: number;
  getReservationData: () => ReservationData | null;
}

const fetchProducts = async (counselorId: number): Promise<Product[]> => {
  const response = await axiosInstance({
    method: 'get',
    url: `p/counselor-item/${counselorId}`,
  });
  console.log(response.data);
  return response.data;
};

const createReservation = async (reservationData: ReservationData) => {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: 'm/reservation',
      data: reservationData,
    });
    console.log('예약 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('예약 실패:', error);
    throw error;
  }
};

const CounselorSidebar: React.FC<CounselorSidebarProps> = ({
  username,
  counselorId,
  getReservationData,
}) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ['counselorProducts', counselorId],
    queryFn: () => fetchProducts(counselorId),
  });

  const handleReservation = async (counselorItemId: number) => {
    const reservationData = getReservationData();
    if (reservationData) {
      try {
        await createReservation({ ...reservationData, counselorItemId });
        // 예약 성공 후 처리 (예: 알림 표시, 페이지 리디렉션 등)
      } catch (error) {
        // 에러 처리
        console.error('예약 실패:', error);
      }
    } else {
      console.error('예약 데이터가 없습니다.');
    }
  };

  if (isLoading) return <div>상품 정보를 불러오는 중...</div>;
  if (error) return <div>상품을 불러오는 데 실패했습니다. 다시 시도해 주세요.</div>;

  return (
    <div className="sticky top-20 overflow-auto">
      <img
        src={DefaultProfile}
        className="w-full h-64 object-cover rounded-lg"
        alt="프로필 이미지"
      />
      <div className="flex my-4 justify-start">
        <div className="flex items-end">
          <div className="text-3xl font-bold">{username}</div>
          <div className="text-base font-bold ml-2">상담사</div>
        </div>
      </div>
      <div>
        <div className="text-xl font-bold border-b-4 border-primary pb-2 mb-4">상품선택</div>
        {products && products.length > 0 ? (
          products.map(product => (
            <div
              key={product.counselorItemId}
              className="mb-3 collapse collapse-plus bg-white border border-orange-400 shadow-sm rounded-lg"
            >
              <input
                type="checkbox"
                className="peer"
                checked={expandedProduct === product.name}
                onChange={() =>
                  setExpandedProduct(expandedProduct === product.name ? null : product.name)
                }
              />
              <div className="collapse-title text-base font-medium">
                <div className="font-bold">{product.name}</div>
                <div>{product.fee}원</div>
              </div>
              <div className="collapse-content">
                <p className="mb-4">{product.description}</p>
                <div className="flex justify-center">
                  <Button
                    label="예약하기"
                    onClick={() => handleReservation(product.counselorItemId)}
                    color="orange"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>등록된 상품이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default CounselorSidebar;
