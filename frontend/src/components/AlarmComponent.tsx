import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import {
  fetchNotifications,
  readNotification,
  deleteAllNotifications,
  deleteNotification,
} from '@/api/alarm';

interface Alarm {
  id: number;
  message: string;
  isRead: boolean;
  timestamp: string;
}

const AlarmComponent: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: alarms = [],
    isLoading,
    error,
  } = useQuery<Alarm[]>({
    queryKey: ['alarms'],
    queryFn: fetchNotifications,
    refetchInterval: 60000, // Refetch every minute
  });

  useEffect(() => {
    const eventSource = new EventSourcePolyfill('https://your-api-url.com/alarms', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    eventSource.onmessage = event => {
      const newAlarm: Alarm = JSON.parse(event.data);
      queryClient.setQueryData(['alarms'], (oldData: Alarm[] | undefined) =>
        oldData ? [...oldData, newAlarm] : [newAlarm]
      );
    };

    eventSource.onerror = error => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  const handleReadAlarm = async (id: number) => {
    await readNotification(id);
    queryClient.invalidateQueries({ queryKey: ['alarms'] });
  };

  const handleDeleteAlarm = async (id: number) => {
    await deleteNotification(id);
    queryClient.invalidateQueries({ queryKey: ['alarms'] });
  };

  const handleDeleteAllAlarms = async () => {
    await deleteAllNotifications();
    queryClient.invalidateQueries({ queryKey: ['alarms'] });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h2>실시간 알람</h2>
      {alarms.map(alarm => (
        <div key={alarm.id}>
          <p>{alarm.message}</p>
          <small>{alarm.timestamp}</small>
          <button onClick={() => handleReadAlarm(alarm.id)}>읽음 표시</button>
          <button onClick={() => handleDeleteAlarm(alarm.id)}>삭제</button>
        </div>
      ))}
      <button onClick={handleDeleteAllAlarms}>모두 삭제</button>
    </div>
  );
};

export default AlarmComponent;
