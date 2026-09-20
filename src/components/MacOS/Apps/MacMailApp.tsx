import React, { useState } from 'react';
import {
  FaInbox,
  FaPaperPlane,
  FaStar,
  FaTrash,
  FaEdit,
  FaCheck,
  FaCopy,
  FaReply,
  FaEnvelope,
  FaSearch,
} from 'react-icons/fa';

interface MailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  time: string;
  preview: string;
  body: string;
  unread: boolean;
}

const SAMPLE_MAILS: MailItem[] = [
  {
    id: '1',
    sender: 'GitHub Octocat',
    senderEmail: 'notifications@github.com',
    subject: 'Starred your repository ashishchanchal/portfolio-os',
    date: 'Today',
    time: '10:42 AM',
    preview: 'Your repository was starred by multiple engineers...',
    body: 'Hi Ashish,\n\nGreat work! Your portfolio OS project (featuring Windows 11 and macOS Tahoe desktop simulations) just hit another milestone of stars. Engineering teams love the smooth glassmorphism, responsive dock, and interactive terminal.\n\nKeep building,\nThe GitHub Team',
    unread: true,
  },
  {
    id: '2',
    sender: 'Tech Talent Partners',
    senderEmail: 'recruiting@tierone-tech.io',
    subject: 'Senior Full Stack & AI Systems Engineering Opportunity',
    date: 'Yesterday',
    time: '4:15 PM',
    preview: 'We were highly impressed by your full-stack architecture skills...',
    body: 'Dear Ashish,\n\nWe came across your portfolio and technical projects (including Sociantra and TODOAI). We have a high-impact engineering leadership role focusing on scalable TypeScript, React, Next.js, and AI workflows.\n\nWould you be open for an introductory chat this week?\n\nBest,\nTalent Acquisition Team',
    unread: false,
  },
  {
    id: '3',
    sender: 'Apple Developer Team',
    senderEmail: 'dev-updates@apple.com',
    subject: 'macOS Tahoe Beta Design Standards & HIG Update',
    date: 'Sep 18',
    time: '2:30 PM',
    preview: 'Explore the new Human Interface Guidelines for desktop apps...',
    body: 'Hello Developer,\n\nDiscover the latest aesthetic paradigms: ultra-blurred translucent sheets, fluid micro-interactions, responsive dock mechanics, and spatial depth.\n\nThank you for building delightful software.\nApple Developer Relations',
    unread: false,
  },
];

export const MacMailApp: React.FC = () => {
  const [mails, setMails] = useState<MailItem[]>(SAMPLE_MAILS);
  const [selectedMailId, setSelectedMailId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [subject, setSubject] = useState('Engineering Role / Collaboration');
  const [body, setBody] = useState(
    'Hi Ashish,\n\nI reviewed your portfolio and would like to connect regarding an engineering opportunity or consulting project.\n\nBest regards,\n'
  );
  const [copied, setCopied] = useState(false);
  const myEmail = 'akchanchal2002@gmail.com';

  const selectedMail = mails.find((m) => m.id === selectedMailId) || mails[0];

  const handleSelectMail = (id: string) => {
    setSelectedMailId(id);
    setIsComposing(false);
    setMails((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
    );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMail = () => {
    const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  const filteredMails = mails.filter(
    (m) =>
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-[#1e1e24] text-zinc-200 select-none text-xs font-sans overflow-hidden">
      {/* 1. Sidebar */}
      <div className="w-48 bg-[#16161b]/90 border-r border-white/10 flex flex-col justify-between p-3 flex-shrink-0">
        <div className="space-y-4">
          {/* Action Compose */}
          <button
            onClick={() => setIsComposing(true)}
            className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <FaEdit className="text-xs" />
            <span>New Message</span>
          </button>

          {/* Mailboxes */}
          <div className="space-y-0.5">
            <div className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500 px-2 py-1">
              Mailboxes
            </div>
            <button
              onClick={() => setIsComposing(false)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                !isComposing
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FaInbox className="text-blue-400" />
                <span>Inbox</span>
              </div>
              <span className="text-[10px] bg-blue-500/30 border border-blue-400/40 text-blue-300 font-mono px-1.5 py-0.2 rounded-full">
                {mails.filter((m) => m.unread).length || mails.length}
              </span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:bg-white/5 text-xs transition-colors">
              <FaStar className="text-amber-400" />
              <span>VIP</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:bg-white/5 text-xs transition-colors">
              <FaPaperPlane className="text-emerald-400 text-[11px]" />
              <span>Sent</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:bg-white/5 text-xs transition-colors">
              <FaTrash className="text-zinc-500 text-[11px]" />
              <span>Trash</span>
            </button>
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
          <div className="text-[10px] text-zinc-400 flex items-center justify-between">
            <span>Direct Email</span>
            <button
              onClick={copyEmail}
              className="text-blue-400 hover:text-blue-300 text-[10px] flex items-center gap-1"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
            </button>
          </div>
          <div className="font-mono text-[10px] text-zinc-300 truncate">
            {myEmail}
          </div>
        </div>
      </div>

      {/* 2. Message List */}
      <div className="w-64 bg-[#18181f]/80 border-r border-white/10 flex flex-col flex-shrink-0">
        {/* Search */}
        <div className="p-2.5 border-b border-white/10">
          <div className="relative">
            <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-[11px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all mail"
              className="w-full pl-7 pr-2 py-1 rounded-md bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* List items */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5 macos-scroll">
          {filteredMails.map((mail) => {
            const isSelected = !isComposing && selectedMailId === mail.id;
            return (
              <div
                key={mail.id}
                onClick={() => handleSelectMail(mail.id)}
                className={`p-3 cursor-pointer transition-colors relative ${
                  isSelected
                    ? 'bg-blue-600/30 border-l-2 border-blue-500 text-white'
                    : 'hover:bg-white/5 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {mail.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                    )}
                    <span className="font-semibold text-xs text-white truncate max-w-[130px]">
                      {mail.sender}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {mail.time}
                  </span>
                </div>
                <div className="font-medium text-[11px] text-zinc-200 truncate mb-1">
                  {mail.subject}
                </div>
                <div className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {mail.preview}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Message Detail / Composer View */}
      <div className="flex-1 flex flex-col bg-[#1e1e24] overflow-hidden">
        {isComposing ? (
          /* Composer View */
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  <span>New Message to Ashish</span>
                </h3>
                <button
                  onClick={copyEmail}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 border border-white/10 text-[11px] flex items-center gap-1.5 text-zinc-300"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span>{myEmail}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 py-1.5 border-b border-white/10 text-xs">
                <span className="text-zinc-500 w-16">To:</span>
                <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50 font-mono">
                  {myEmail}
                </span>
              </div>

              <div className="flex items-center gap-3 py-1.5 border-b border-white/10 text-xs">
                <span className="text-zinc-500 w-16">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs"
                />
              </div>

              <div className="pt-2">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className="w-full bg-[#16161c] p-3.5 rounded-xl border border-white/10 text-white font-sans text-xs resize-none outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">
                Direct transmission via macOS Mail engine
              </span>
              <button
                onClick={handleSendMail}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 shadow-lg transition-all"
              >
                <FaPaperPlane className="text-xs" />
                <span>Send Mail</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reader View */
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-base font-bold text-white mb-2">
                  {selectedMail.subject}
                </h2>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {selectedMail.sender[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {selectedMail.sender}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {selectedMail.senderEmail}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-zinc-500">
                    <div>{selectedMail.date}</div>
                    <div className="font-mono">{selectedMail.time}</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line py-2">
                {selectedMail.body}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setSubject(`Re: ${selectedMail.subject}`);
                  setIsComposing(true);
                }}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium flex items-center gap-2 text-xs"
              >
                <FaReply />
                <span>Reply to Sender</span>
              </button>
              <button
                onClick={copyEmail}
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-1.5"
              >
                <span>Write to Ashish directly</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacMailApp;
