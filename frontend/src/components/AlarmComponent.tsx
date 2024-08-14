import React, { useState, useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

interface Alarm {
  id: number;
  message: string;
  isRead: boolean;
  timestamp: string;
}

const AlarmComponent: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill('https://your-api-url.com/alarms', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    eventSource.onmessage = event => {
      const newAlarm: Alarm = JSON.parse(event.data);
      setAlarms(prevAlarms => [...prevAlarms, newAlarm]);
    };

    eventSource.onerror = error => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>실시간 알람</h2>
      {alarms.map(alarm => (
        <div key={alarm.id}>
          <p>{alarm.message}</p>
          <small>{alarm.timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default AlarmComponent;
