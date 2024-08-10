import { useState } from 'react';
import axios from 'axios';
import openai from 'openai';
const PromptEngineering = () => {
  const [modelResponse, setModelResponse] = useState('');

  const context = [
    {
      role: 'system',
      content: '너는 삶이 힘든 사람을 도와주는 상담사의 역할을 해줬으면 좋겠어',
    },
    { role: 'user', content: '저 너무 힘들어요. 도움을 주세요' },
    { role: 'assistant', content: '정말 힘드신가보군요. 어떤 감정을 느끼시나요?' },
    {
      role: 'user',
      content: '회사에 첫 입사했는데 제가 잘 따라기지 못한다고 느껴져요. 너무 우울해요',
    },
    {
      role: 'assistant',
      content:
        '사람은 실수를 통해 발전을 합니다. 아직 신입이기 때문에 못하는 것이 당연할 수도 있어요. 작은 성공을 쌓아서 큰 성공을 쌓는다고 생각해주세요',
    },
    { role: 'user', content: '도움이 될 수 있는 방법이 없을까요?' },
    {
      role: 'assistant',
      content:
        '실력 좋으신 많은 상담가 분들이 많으니 조금 더 전문적인 내용이 필요하다면 저희 상담가분들을 찾아주세요',
    },
  ];

  const fetchModelResponse = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          //   messages: [{ role: 'user', content: context }],
          messages: context,
          temperature: 0.1,
          max_tokens: 100, // 응답받을 메시지 최대 토큰(단어) 수 설정
          top_p: 1, // 토큰 샘플링 확률을 설정, 높을수록 다양한 출력을 유도
          frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
          presence_penalty: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      const reply = response.data.choices[0]?.message.content.trim(); // optional chaining 사용
      setModelResponse(reply);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching model response:', error);
      setModelResponse('Error fetching model response.');
    }
  };

  return (
    <div>
      <h2>Prompt Engineering</h2>
      <button onClick={fetchModelResponse}>Test Prompt</button>
      <div>
        <h3 className="text-2xl">Model Response:</h3>
        <p className="text-red-500">{modelResponse}</p>
      </div>
    </div>
  );
};

export default PromptEngineering;
