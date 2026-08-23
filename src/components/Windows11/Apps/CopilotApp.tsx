import React, { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaStar } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    sender: 'ai',
    text: 'Hello! I am Windows Copilot, configured with knowledge of Ashish Chanchal’s full-stack and AI systems engineering background. How can I help you today? Ask me about his NestJS microservices, DRDO machine learning research, voice AI pipelines, or technical stack!',
    time: '12:00 PM',
  },
];

export const CopilotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('voice') || q.includes('sociantra') || q.includes('latency')) {
      return 'Ashish optimized real-time voice assistant latency at Alphadroid / Sociantra from 15 seconds down to <3 seconds by orchestrating MultiModel streaming protocols, low-latency WebSocket frames, and Azure Cloud infrastructure.';
    }
    if (q.includes('drdo') || q.includes('research') || q.includes('ml') || q.includes('eeg')) {
      return 'At INMAS (DRDO), Ashish analyzed clinical high-dimensional EEG brainwave telemetry and engineered Random Forest and Decision Tree classifiers reaching 88.89% diagnostic accuracy in early neurological disease detection.';
    }
    if (q.includes('todoai') || q.includes('mcp')) {
      return 'TODOAI is an autonomous task management workspace built on the Model Context Protocol (MCP). It features natural language commitment parsing, cron scheduling, and AI agent integration for automated task breakdowns.';
    }
    if (q.includes('skills') || q.includes('stack') || q.includes('tech')) {
      return 'Ashish’s core stack includes: TypeScript, React, Next.js, Node.js, NestJS, Three.js, Python, FastAPI, PyTorch, Flutter, PostgreSQL, MongoDB, Redis, and Azure Cloud.';
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
      return 'You can reach Ashish directly via email at akchanchal2002@gmail.com or connect with him on LinkedIn: https://www.linkedin.com/in/ashishchanchal/';
    }
    return `Ashish is an experienced Software Developer & AI Systems Engineer who focuses on building high-performance, low-latency systems across full-stack architectures and machine learning pipelines. Feel free to ask about any specific project or experience!`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply: Message = {
        sender: 'ai',
        text: getAIResponse(currentQuery),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-[#1f1f24] text-zinc-200 text-xs select-none">
      {/* Header */}
      <div className="p-3 bg-[#18181c] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={WIN11_ICONS.copilot} alt="Copilot" className="w-5 h-5 object-contain" />
          <div>
            <div className="font-bold text-white text-xs flex items-center gap-1.5">
              <span>Windows Copilot</span>
              <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-[9px] text-white font-mono">
                GPT-4o Vision
              </span>
            </div>
            <div className="text-[10px] text-zinc-400">Ashish Chanchal Portfolio Assistant</div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto win11-scroll space-y-3 bg-[#151518]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gradient-to-tr from-purple-600 to-blue-500 text-white'
              }`}
            >
              {m.sender === 'user' ? <FaUser className="w-3 h-3" /> : <FaRobot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[80%] p-3 rounded-2xl leading-relaxed text-xs shadow-md select-text ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#22222a] border border-white/10 text-zinc-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-blue-200' : 'text-zinc-500'}`}>
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs italic">
            <FaStar className="text-amber-400 animate-spin" />
            <span>Copilot is formulating response...</span>
          </div>
        )}
      </div>

      {/* Suggested chips */}
      <div className="px-4 py-1.5 bg-[#18181c] border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar text-[10px]">
        {['Voice AI latency', 'DRDO ML research', 'TODOAI MCP', 'Tech Stack', 'Contact Info'].map((chip, i) => (
          <button
            key={i}
            onClick={() => setInput(chip)}
            className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-3 bg-[#1c1c20] border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask Copilot anything about Ashish's skills or engineering..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#141418] border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all shadow"
        >
          <FaPaperPlane className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};

export default CopilotApp;
