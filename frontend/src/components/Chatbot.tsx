// src/components/Chatbot.tsx

import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import chatFox from '@/assets/chat_fox.png';
import chatPrince from '@/assets/chat_prince.png';
import ReactMarkdown from 'react-markdown';
import { AiOutlineSend } from 'react-icons/ai';
interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}
const emotion = [
  '우울해요',
  '짜증나요',
  '화나요',
  '속상해요',
  '무서워요',
  '두려워요',
  '기뻐요',
  '신나요',
  '힘들어요',
  '슬퍼요',
  '행복해요',
  '감사해요',
];
const Chatbot = ({ promptTemplate }: { promptTemplate: string }) => {
  const [userInput, setUserInput] = useState<string>(''); // 사용자 입력 상태 관리
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'ai', content: '오늘 하루 어떠셨나요?' },
  ]); // 채팅 히스토리 관리
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleQuickReply = (reply: string) => {
    setUserInput(reply);
    fetchBotReply(reply);
  };
  const fetchBotReply = async (input: string) => {
    if (!input.trim()) return;
    const customizedPrompt = promptTemplate.replace('{input}', input); // 프롬프트 템플릿에 사용자 입력 삽입
    // 사용자 메시지 채팅 히스토리에 추가
    setChatHistory(prev => [...prev, { role: 'user', content: input }]);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          // messages: [{ role: 'user', content: customizedPrompt }],
          messages: [{ role: 'user', content: input }],
          temperature: 0.8, // 답변의 창의성, 무작위성. 낮을수록 T
          max_tokens: 100, // 응답받을 메시지 최대 토큰(단어) 수 설정
          top_p: 1, // 토큰 샘플링 확률을 설정, 높을수록 다양한 출력을 유도
          frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
          presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
          //stop: ['Human'], // 생성된 텍스트에서 종료 구문을 설정
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      console.log(response);
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const reply = response.data.choices[0]?.message.content.trim(); // optional chaining 사용
        if (reply) {
          setChatHistory(prev => [...prev, { role: 'ai', content: reply }]);
        } else {
          throw new Error('API 응답에서 텍스트가 유효하지 않습니다.');
        }
      } else {
        throw new Error('API 응답이 예상대로 구조화되지 않았습니다.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API 오류 상태:', error.response.status);
          console.error('API 오류 데이터:', error.response.data);
        } else if (error.request) {
          console.error('응답을 받지 못했습니다:', error.request);
        } else {
          console.error('요청 설정 오류:', error.message);
        }
      } else {
        console.error('알 수 없는 오류:', error);
      }
      setChatHistory(prev => [
        ...prev,
        { role: 'ai', content: '죄송합니다. 현재 요청을 처리할 수 없습니다.' },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      fetchBotReply(userInput);
      setUserInput('');
    }
  };

  useEffect(() => {
    // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 스크롤 이벤트가 상위로 전파되는 것을 방지
  };
  return (
    <>
      <section className="card min-w-[80%] h-full bg-white ">
        <h2 className="card-title justify-center text-2xl font-bold pt-5">
          오늘의 기분을 표현해주세요
        </h2>
        <div className="card-body overflow-y-scroll">
          <div
            ref={chatBoxRef}
            onScroll={handleScroll}
            className="flex-grow flex flex-col overflew-y-auto max-h-[calc(100% -100px)] align-bottom justify-end gap-1 "
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-center ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'user' ? (
                  <div className="flex items-end max-w-[70%]">
                    <div className="bg-orange-200 rounded-lg p-2 mr-2">
                      <p className="pr-1">{message.content}</p>
                    </div>
                    <div className="avatar flex-shrink-0">
                      <div className="mask mask-squircle max-w-10">
                        <img src={chatPrince} alt="당신" className="w-full h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[70%] flex items-start">
                    <div className="avatar flex-shrink-0">
                      <div className="mask mask-squircle w-10">
                        <img src={chatFox} alt="친구" className="w-full h-full rounded-full" />
                      </div>
                    </div>
                    <div className="bg-blue-200 rounded-lg p-2 ml-2 ">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="card-actions justify-center items-bottom mt-3">
              <div className="flex flex-wrap gap-2 mb-4">
                {emotion.map(reply => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-[#E6E6E6] hover:bg-[#D9D9D9] text-sm py-1 px-3 rounded-full"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="block w-full sm:w-[400px] md:w-[600px]">
                <p className="flex p-3 border border-black rounded-full justify-between">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="채팅을 입력해주세요."
                    className="w-full outline-none"
                  />
                  <button type="submit">
                    <AiOutlineSend />
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chatbot;
