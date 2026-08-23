import React, { useState } from 'react';
import { FaPaperPlane, FaCopy, FaCheck, FaEnvelope, FaInbox, FaStar, FaTrash } from 'react-icons/fa';

export const MailApp: React.FC = () => {
  const [subject, setSubject] = useState('Collaboration / Software Engineering Role');
  const [body, setBody] = useState('Hi Ashish,\n\nI reviewed your portfolio and would like to connect regarding a high-impact engineering opportunity / AI consulting project.\n\nBest regards,\n');
  const [copied, setCopied] = useState(false);
  const email = 'akchanchal2002@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="h-full flex bg-[#1a1a1a] text-zinc-200 text-xs select-none">
      {/* Left Sidebar */}
      <div className="w-48 bg-[#161616] border-r border-white/10 p-3 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold px-2 py-1">
            <FaEnvelope className="text-blue-400" />
            <span>Outlook Mail</span>
          </div>

          <div className="space-y-1 text-zinc-400">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/10 text-white font-semibold">
              <div className="flex items-center gap-2">
                <FaInbox className="text-blue-400" />
                <span>Inbox</span>
              </div>
              <span className="text-[10px] bg-blue-600 px-1.5 py-0.2 rounded-full text-white font-bold">1</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/5">
              <FaStar className="text-amber-400" />
              <span>Starred</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/5">
              <FaTrash className="text-zinc-500" />
              <span>Trash</span>
            </div>
          </div>
        </div>

        <div className="p-2 rounded bg-black/40 border border-white/5 text-[10px] text-zinc-500 font-mono">
          STATUS: ONLINE
        </div>
      </div>

      {/* Main Mail Composer */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#1f1f1f] overflow-y-auto win11-scroll">
        <div className="space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">New Message</h3>
            <button
              onClick={copyEmail}
              className="px-2.5 py-1 rounded bg-[#2a2a2a] hover:bg-[#333333] border border-white/10 text-[11px] flex items-center gap-1.5 font-mono text-zinc-300"
            >
              {copied ? <><FaCheck className="text-emerald-400" /><span>Copied!</span></> : <><FaCopy /><span>Copy Email Address</span></>}
            </button>
          </div>

          {/* To Field */}
          <div className="flex items-center gap-3 py-1 border-b border-white/10 text-xs">
            <span className="text-zinc-500 w-16">To:</span>
            <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50 font-mono">
              {email}
            </span>
          </div>

          {/* Subject Field */}
          <div className="flex items-center gap-3 py-1 border-b border-white/10 text-xs">
            <span className="text-zinc-500 w-16">Subject:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-xs"
            />
          </div>

          {/* Body Field */}
          <div className="pt-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={9}
              className="w-full bg-[#161616] p-3 rounded-lg border border-white/10 text-white font-sans text-xs resize-none outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Send Button Toolbar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-zinc-500 text-[11px] font-mono">
            Direct routing to Ashish Chanchal's inbox
          </div>

          <button
            onClick={handleSend}
            className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <FaPaperPlane className="w-3 h-3" />
            <span>Send Transmission</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailApp;
