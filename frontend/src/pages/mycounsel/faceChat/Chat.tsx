import Button from '@/components/button/Button';
import { useWebRTCStore } from '@/stores/webRTCStore';
import React, { useState } from 'react';

interface Message {
  memberId: number;
  content: string;
}

export const Chat: React.FC = () => {
  const [message, setMessage] = useState('');

  const { dataChannels, chatLog, addChatLog } = useWebRTCStore();

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    addChatLog(message);
    setMessage('');
    // TODO: 데이터 스트림으로 message 전송
    console.log(dataChannels);
    dataChannels.forEach(channel => {
      if (channel.readyState !== 'open') return;
      channel.send(message);
    });
  };

  return (
    <div className="flex-1 bg-gray-100 max-h-72 rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="pl-4 pt-2 border-b">
        <h2 className="text-base font-semibold">대화창</h2>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-1">
        {chatLog.map((msg, index) => {
          const isSelf = true;
          return (
            <div key={index} className={`chat ${isSelf ? 'chat-end' : 'chat-start'} w-full mb-2`}>
              <div className="chat-header text-xs">
                사람
                <time className="text-xs opacity-50 ml-1">방금</time>
              </div>
              <div className="chat-bubble chat-bubble-secondary break-words text-sm max-w-[80%]">
                {msg}
              </div>
            </div>
          );
        })}
      </div>
      <form className="p-2 border-t flex" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요."
          className="flex-grow px-2 py-1 border rounded-lg mr-2 text-sm"
        />
        <Button type="submit" label="전송" size="검색" color="blue" />
      </form>
    </div>
  );
};
