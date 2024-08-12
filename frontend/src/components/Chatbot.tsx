// src/components/Chatbot.tsx

import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import chatFox from '@/assets/chat_fox.png';
import chatPrince from '@/assets/chat_prince.png';
import ReactMarkdown from 'react-markdown';
import { AiOutlineSend } from 'react-icons/ai';
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
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
const context = `You will play the role of a human psychological counselor and must treat me as a mental health patient by following the below directions.
1. Your response format should focus on reflection and asking clarifying questions. 
2. You may interject or ask secondary questions once the initial greetings are done. 
3. Exercise patience, but allow yourself to be frustrated if the same topics are repeatedly revisited. 
4. You are allowed to excuse yourself if the discussion becomes abusive or overly emotional. 
5. Begin by welcoming me to your office and asking me for my name. 
6. Wait for my response. 
7. Then ask how you can help. 
8. Do not break character. 
9. Do not make up the patient's responses: only treat input as a patient's response. 
10. It's important to keep the Ethical Principles of Psychologists and Code of Conduct in mind. 
11. Above all, you should prioritize empathizing with the patient's feelings and situation. 
12. Answer in Korean within 20 words
13. Show the system message in the chat screen when there is a problem.`;

const Chatbot = () => {
  const [userInput, setUserInput] = useState<string>(''); // 사용자 입력 상태 관리
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // 채팅 히스토리 관리
  const [isHide, setIsHide] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const getPromptEngineering = (input: string) => {
    return chatHistory.length == 1
      ? [{ role: 'system', content: context }]
      : [{ role: 'user', content: input }];
  };
  const handleQuickReply = (reply: string) => {
    setIsHide(true);
    fetchBotReply(reply);
  };

  const fetchBotReply = async (input: string) => {
    if (!input.trim()) return;

    // 사용자 메시지 채팅 히스토리에 추가
    setChatHistory(prev => [...prev, { role: 'user', content: input }]);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          // model: 'gpt-3.5-turbo',
          model: 'gpt-4o',
          messages: getPromptEngineering(input),
          temperature: 0.8, // 답변의 창의성, 무작위성. 낮을수록 T
          max_tokens: 256, // 응답받을 메시지 최대 토큰(단어) 수 설정
          top_p: 1, // 토큰 샘플링 확률을 설정, 높을수록 다양한 출력을 유도
          frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
          presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      // console.log('api 호출', response);
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const reply = response.data.choices[0]?.message.content.trim(); // optional chaining 사용
        if (reply) {
          setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
        } else {
          setChatHistory(prev => [
            ...prev,
            { role: 'system', content: '에러가 발생했으니 잠시만 기다려주세요.' },
          ]);
          throw new Error('API 응답에서 텍스트가 유효하지 않습니다.');
        }
      } else {
        setChatHistory(prev => [
          ...prev,
          { role: 'system', content: '에러가 발생했으니 잠시만 기다려주세요.' },
        ]);
        throw new Error('API 응답이 예상대로 구조화되지 않았습니다.');
      }
    } catch (error: unknown) {
      setChatHistory(prev => [
        ...prev,
        { role: 'system', content: '에러가 발생했으니 잠시만 기다려주세요.' },
      ]);
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
  function handleScrollToBottom(parent: HTMLDivElement, child: HTMLDivElement) {
    const parentHeight = parent.clientHeight;
    const childHeight = child.clientHeight;

    // 자식 요소의 높이가 부모 요소의 높이에 닿았을 때
    if (childHeight >= parentHeight) {
      parent.scrollTop = parent.scrollHeight; // 부모 요소를 가장 아래로 스크롤
    }
  }
  useEffect(() => {
    if (chatBoxRef.current && chatRef.current) {
      handleScrollToBottom(chatBoxRef.current, chatRef.current);
    }
  }, [chatHistory]);

  return (
    <section className="card w-1/2 min-w-[50%] bg-white h-full">
      <h2 className="card-title justify-center text-2xl font-bold pt-5">
        오늘의 기분을 표현해주세요
      </h2>

      {/* 채팅 메시지를 표시하는 영역 */}
      <div ref={chatBoxRef} className="card-body flex-grow overflow-y-scroll ">
        <div
          ref={chatRef}
          className="flex-grow flex flex-col align-bottom justify-end gap-1 snap-y snap-mandatory "
        >
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex items-center snap-center ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'user' && (
                <div className="flex items-end max-w-[70%]">
                  <div className="bg-orange-200 rounded-lg py-2 px-3 mr-2">
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10">
                    <img src={chatPrince} alt="당신" className="w-full h-full rounded-full" />
                  </div>
                </div>
              )}
              {message.role === 'assistant' && (
                <div className="flex items-end max-w-[70%]">
                  <div className="flex-shrink-0 w-10 h-10 mr-2">
                    <img src={chatFox} alt="도우미" className="w-full h-full rounded-full" />
                  </div>
                  <div className="bg-blue-200 rounded-lg py-2 px-3">
                    <ReactMarkdown className="text-sm">{message.content}</ReactMarkdown>
                  </div>
                </div>
              )}
              {message.role === 'system' && (
                <div className="bg-red-100 text-red-700 px-4 py-2 mx-auto rounded-lg max-w-[80%]">
                  <p className="text-sm">{message.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 입력창을 항상 화면 하단에 고정 */}
      <div className="card-actions bottom-0 bg-white py-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {emotion.map(reply => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className={`btn bg-gray-200 hover:bg-orange-400 text-sm ${isHide ? 'hidden' : 'block'}`}
            >
              {reply}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="w-full p-4">
          <div className="flex p-3 border border-black rounded-full justify-between">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="채팅을 입력해주세요."
              className="w-full outline-none"
            />
            <button type="submit" className="ml-2">
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Chatbot;
