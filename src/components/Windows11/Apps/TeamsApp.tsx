import React, { useState } from 'react';
import { FaPaperPlane, FaVideo, FaPhone, FaCircle } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

export const TeamsApp: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'ashish' | 'user'; text: string; time: string }[]>([
    {
      sender: 'ashish',
      text: 'Hey! Welcome to my Microsoft Teams workstation. How can I assist you with full-stack engineering, AI models, or collaboration?',
      time: '12:00 PM',
    },
    {
      sender: 'ashish',
      text: 'Feel free to drop any project inquiry, technical challenge, or recruiter note right here!',
      time: '12:01 PM',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: inputVal, time };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ashish',
          text: `Thanks for connecting! I have received your message. You can also reach me directly at akchanchal2002@gmail.com.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-full flex bg-[#1f1f23] text-white select-none">
      {/* Sidebar: Chats List */}
      <div className="w-56 bg-[#18181b] border-r border-white/10 flex flex-col justify-between p-3 text-xs">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={WIN11_ICONS.teams} alt="Teams" className="w-5 h-5 object-contain" />
            <span className="font-bold text-sm">Teams Chat</span>
          </div>

          <div className="p-2 bg-white/10 rounded-lg flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                AC
              </div>
              <FaCircle className="absolute bottom-0 right-0 text-emerald-400 w-2.5 h-2.5 border-2 border-[#18181b] rounded-full" />
            </div>
            <div className="overflow-hidden">
              <div className="font-bold truncate text-white">Ashish Chanchal</div>
              <div className="text-[10px] text-emerald-400">Available</div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 text-center">
          Encrypted End-to-End Chat
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col justify-between bg-[#141418]">
        {/* Header */}
        <div className="p-3 bg-[#18181b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              AC
            </div>
            <div>
              <div className="font-bold text-xs">Ashish Chanchal</div>
              <div className="text-[10px] text-zinc-400">Software Developer & AI Systems Engineer</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-white/10 text-zinc-300 hover:text-white" title="Video Call">
              <FaVideo className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded hover:bg-white/10 text-zinc-300 hover:text-white" title="Audio Call">
              <FaPhone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto win11-scroll space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[75%] p-2.5 rounded-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-[#26262e] text-zinc-200 rounded-bl-none border border-white/5'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-zinc-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-[#18181b] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message to Ashish..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-[#202026] border border-white/10 rounded-full px-4 py-2 text-xs text-white outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow"
          >
            <FaPaperPlane className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamsApp;
