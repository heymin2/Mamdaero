import axiosInstance from '@/api/axiosInstance';
import { Reservation } from '@/pages/mycounsel/props/reservationDetail';

export const fetchReservation = async (): Promise<Reservation[]> => {
  const response = await axiosInstance({
    method: 'get',
    url: 'cm/reservation',
  });
  return response.data.data;
};

export const fetchCompletedReservation = async (): Promise<Reservation[]> => {
  const response = await axiosInstance({
    method: 'get',
    url: 'cm/consult',
  });
  return response.data.data;
};

export const fetchReservationDetail = async (reservationId: number) => {
  const response = await axiosInstance({
    method: 'get',
    url: `cm/reservation/${reservationId}`,
  });
  return response.data;
};

export const deleteReservation = async (reservationId: number) => {
  try {
    const response = await axiosInstance({
      method: 'delete',
      url: `cm/reservation/${reservationId}`,
    });
    return response.data;
  } catch (error) {
    alert(`Error canceling reservation: ${error}`);
    throw error;
  }
};
