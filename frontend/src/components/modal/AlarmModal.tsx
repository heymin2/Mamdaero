import React, { useEffect } from 'react';
import { FaBell, FaTrash, FaTimes } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import axiosInstance from '@/api/axiosInstance';

interface Notification {
  notificationId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface AlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance({
    method: 'get',
    url: 'cm/notification',
  });
  console.log(response.data);
  return response.data;
};

const markNotification = async (notificationId: number) => {
  const response = await axiosInstance({
    method: 'patch',
    url: `cm/notification/${notificationId}`,
  });
  return response.data;
};

const deleteAllNotification = async () => {
  const response = await axiosInstance({
    method: 'delete',
    url: 'cm/notification',
  });
  return response.data;
};

const deleteNotification = async (notificationId: number) => {
  const response = await axiosInstance({
    method: 'delete',
    url: `cm/notification/${notificationId}`,
  });
  return response.data;
};
const AlarmModal: React.FC<AlarmModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery<Notification[], AxiosError>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    enabled: isOpen,
  });

  const markAsReadMutation = useMutation<void, AxiosError, number>({
    mutationFn: markNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const deleteAllNotificationsMutation = useMutation<void, AxiosError>({
    mutationFn: deleteAllNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const deleteNotificationMutation = useMutation<void, AxiosError, number>({
    mutationFn: deleteNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  useEffect(() => {
    if (!isOpen) return;

    const eventSource = new EventSourcePolyfill('cm/notification/connect', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    eventSource.onmessage = (event: MessageEvent) => {
      const newNotification = JSON.parse(event.data) as Notification;
      queryClient.setQueryData<Notification[]>(['notifications'], (old = []) => [
        ...old,
        newNotification,
      ]);
    };

    return () => {
      eventSource.close();
    };
  }, [isOpen, queryClient]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">알림</h2>
          <div>
            <button
              onClick={() => deleteAllNotificationsMutation.mutate()}
              className="text-red-500 hover:text-red-700 mr-2"
            >
              <FaTrash />
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
        </div>
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">알림이 없습니다.</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.notificationId} className="border-b py-3 flex items-start">
              <div className="flex-shrink-0 mr-3">
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
              <div className="flex-grow">
                <p className={`${notification.isRead ? 'text-gray-600' : 'font-semibold'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex-shrink-0 ml-2">
                <button
                  onClick={() => markAsReadMutation.mutate(notification.notificationId)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaBell />
                </button>
                <button
                  onClick={() => deleteNotificationMutation.mutate(notification.notificationId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlarmModal;
