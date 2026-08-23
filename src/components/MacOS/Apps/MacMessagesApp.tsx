import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: string;
  sender: 'user' | 'ashish';
  text: string;
  time: string;
  reaction?: string;
}

export const MacMessagesApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ashish',
      text: 'Hey! Welcome to my macOS portfolio workstation.',
      time: '10:00 AM',
    },
    {
      id: 'msg-2',
      sender: 'ashish',
      text: 'I am Ashish Chanchal — full-stack engineer and AI developer. What would you like to build or discuss?',
      time: '10:01 AM',
      reaction: '❤️',
    },
  ]);

  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Trigger smart auto-response
    setTimeout(() => {
      let reply = "Thanks for the message! Feel free to explore my projects in Safari or inspect my code in VS Code.";
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('hire') || lower.includes('job') || lower.includes('contact')) {
        reply = "I'm always open to high-impact software engineering roles and AI projects! Reach me at ashishchanchal.dev@gmail.com or via LinkedIn.";
      } else if (lower.includes('project') || lower.includes('work')) {
        reply = "Check out Sociantra (AI community platform), TODOAI (autonomous task intelligence), and VibePulse (audio engine) in the App Store or Safari!";
      } else if (lower.includes('skill') || lower.includes('stack')) {
        reply = "My primary stack revolves around TypeScript, React 19, Node.js, Python, AI Agent orchestration, and Cloud infrastructure.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'ashish',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  const addReaction = (msgId: string, emoji: string) => {
    setMessages(messages.map((m) => (m.id === msgId ? { ...m, reaction: m.reaction === emoji ? undefined : emoji } : m)));
  };

  return (
    <div className="h-full flex bg-[#181820] text-white select-none">
      {/* Left Chat Sidebar */}
      <div className="w-64 bg-[#14141a]/95 border-r border-white/10 p-2 flex flex-col">
        <div className="px-3 py-2 font-bold text-sm">Messages</div>

        <div className="p-2.5 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs shadow">
            AC
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="truncate">Ashish Chanchal</span>
              <span className="text-[10px] text-zinc-400 font-mono">Now</span>
            </div>
            <div className="text-[11px] text-zinc-400 truncate">Software Engineer // Online</div>
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1c1c24]">
        {/* Header */}
        <div className="h-12 bg-[#22222c] border-b border-white/10 px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Ashish Chanchal (iMessage)</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">Encrypted with End-to-End Security</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto macos-scroll space-y-3">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group relative`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed relative ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-sm shadow-md'
                      : 'bg-zinc-800 text-zinc-100 rounded-bl-sm border border-white/10'
                  }`}
                >
                  {msg.text}

                  {msg.reaction && (
                    <div className="absolute -bottom-2 -right-1 bg-[#1e1e24] border border-white/20 rounded-full px-1.5 py-0.5 text-[10px] shadow">
                      {msg.reaction}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[9px] text-zinc-500 font-mono">{msg.time}</span>
                  {!isUser && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <button
                        onClick={() => addReaction(msg.id, '❤️')}
                        className="text-[10px] hover:scale-125 transition-transform"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => addReaction(msg.id, '👍')}
                        className="text-[10px] hover:scale-125 transition-transform"
                      >
                        👍
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-[#22222c] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage to Ashish Chanchal..."
            className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 placeholder-zinc-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 flex items-center justify-center text-white text-xs transition-all shadow"
          >
            <FaPaperPlane className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MacMessagesApp;
