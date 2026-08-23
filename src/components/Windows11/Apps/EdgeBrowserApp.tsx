import React, { useState, useEffect } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaHome,
  FaLock,
  FaPlus,
  FaTimes,
  FaGlobe,
  FaExternalLinkAlt,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFilePdf,
} from 'react-icons/fa';

interface Tab {
  id: string;
  title: string;
  url: string;
}

interface EdgeBrowserAppProps {
  initialUrl?: string;
}

const generateTabId = () => 'tab-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();

export const EdgeBrowserApp: React.FC<EdgeBrowserAppProps> = ({ initialUrl }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-default-sociantra',
      title: 'Sociantra · Voice AI',
      url: 'https://sociantra.ashishchanchal.in/',
    },
    {
      id: 'tab-default-todoai',
      title: 'TODOAI · Task Engine',
      url: 'https://github.com/Ashish-chanchal/todoai',
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab-default-sociantra');
  const [urlInput, setUrlInput] = useState<string>('https://sociantra.ashishchanchal.in/');
  const [isLoading, setIsLoading] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);

  const getTabTitle = (u: string): string => {
    if (u.includes('sociantra')) return 'Sociantra · Live';
    if (u.includes('todoai')) return 'TODOAI · GitHub';
    if (u.includes('instagram.com')) return 'Instagram · @ashish._chanchal';
    if (u.includes('linkedin.com')) return 'LinkedIn · Ashish Chanchal';
    if (u.includes('twitter.com') || u.includes('x.com')) return 'X / Twitter · @ashishchanchal0';
    if (u.includes('github.com')) return 'GitHub · Ashish-chanchal';
    if (u.includes('drive.google.com') || u.includes('pdf')) return 'Resume PDF · Document';
    return 'Microsoft Edge';
  };

  useEffect(() => {
    if (!initialUrl) return;

    setTabs((prev) => {
      const existing = prev.find((t) => t.url === initialUrl);
      if (existing) {
        setActiveTabId(existing.id);
        setUrlInput(existing.url);
        return prev;
      }

      const newId = generateTabId();
      const newTab: Tab = {
        id: newId,
        title: getTabTitle(initialUrl),
        url: initialUrl,
      };
      setActiveTabId(newId);
      setUrlInput(initialUrl);
      return [...prev, newTab];
    });

    setIframeKey((k) => k + 1);
  }, [initialUrl]);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleSelectTab = (tab: Tab) => {
    setActiveTabId(tab.id);
    setUrlInput(tab.url);
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const nextTabs = tabs.filter((t) => t.id !== id);
    setTabs(nextTabs);
    if (activeTabId === id) {
      setActiveTabId(nextTabs[0].id);
      setUrlInput(nextTabs[0].url);
    }
  };

  const handleNewTab = () => {
    const newId = generateTabId();
    const newTab: Tab = {
      id: newId,
      title: 'Sociantra · Live',
      url: 'https://sociantra.ashishchanchal.in/',
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setUrlInput(newTab.url);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = urlInput.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setIsLoading(true);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? { ...t, url: finalUrl, title: getTabTitle(finalUrl) }
          : t
      )
    );
    setIframeKey((k) => k + 1);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Detect social/restricted URLs that enforce X-Frame-Options: DENY
  const isInstagram = activeTab.url.includes('instagram.com');
  const isLinkedIn = activeTab.url.includes('linkedin.com');
  const isTwitter = activeTab.url.includes('twitter.com') || activeTab.url.includes('x.com');
  const isResumeDrive = activeTab.url.includes('drive.google.com');

  return (
    <div className="h-full flex flex-col bg-[#1f1f24] text-zinc-200 text-xs select-none">
      {/* Edge Tabs Bar */}
      <div className="flex items-center bg-[#141418] px-2 pt-1.5 gap-1 border-b border-white/10 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleSelectTab(tab)}
            className={`group px-3 py-1.5 rounded-t-lg text-xs flex items-center gap-2 cursor-pointer max-w-[220px] transition-all flex-shrink-0 ${
              activeTabId === tab.id
                ? 'bg-[#25252e] text-white font-medium border-t-2 border-blue-500 shadow'
                : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block flex-shrink-0" />
            <span className="truncate">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => handleCloseTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white ml-auto"
              >
                <FaTimes className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={handleNewTab}
          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
          title="New Tab"
        >
          <FaPlus className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Edge Navigation Bar */}
      <div className="p-2 bg-[#202028] border-b border-white/10 flex items-center gap-2">
        <button
          onClick={handleReload}
          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
        >
          <FaArrowLeft className="w-3 h-3" />
        </button>
        <button
          onClick={handleReload}
          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
        >
          <FaArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={handleReload}
          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
          title="Reload Page"
        >
          <FaRedo className={`w-3 h-3 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
        </button>
        <button
          onClick={() => {
            const homeUrl = 'https://sociantra.ashishchanchal.in/';
            setUrlInput(homeUrl);
            setTabs((prev) =>
              prev.map((t) =>
                t.id === activeTabId
                  ? { ...t, url: homeUrl, title: 'Sociantra · Live' }
                  : t
              )
            );
            setIframeKey((k) => k + 1);
          }}
          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
          title="Home"
        >
          <FaHome className="w-3 h-3" />
        </button>

        {/* Address input */}
        <form
          onSubmit={handleNavigate}
          className="flex-1 flex items-center bg-[#141418] border border-white/10 rounded-full px-3.5 py-1.5 gap-2 text-zinc-300 font-mono text-[11px] focus-within:border-blue-500"
        >
          <FaLock className="text-emerald-400 w-2.5 h-2.5 flex-shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-xs font-mono"
            placeholder="Enter web address..."
          />
        </form>

        <button
          onClick={handleNavigate}
          className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all"
        >
          Go
        </button>
      </div>

      {/* Website Viewport */}
      <div className="flex-1 relative bg-white overflow-hidden select-auto">
        {isLoading && (
          <div className="absolute inset-0 bg-[#16161c] z-20 flex flex-col items-center justify-center gap-3 text-zinc-300">
            <FaGlobe className="w-8 h-8 text-blue-400 animate-spin" />
            <div className="font-mono text-xs text-zinc-400">Loading {activeTab.url}...</div>
          </div>
        )}

        {/* Handling X-Frame Protected Social Services */}
        {isInstagram ? (
          <div className="w-full h-full bg-gradient-to-br from-[#121216] via-[#1a1a24] to-[#241429] flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center shadow-2xl mb-4">
              <FaInstagram className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold">@ashish._chanchal on Instagram</h2>
            <p className="text-zinc-400 text-xs max-w-md mt-2 leading-relaxed">
              Instagram security prevents direct iframe embedding. Open the verified profile directly in a browser window.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/ashish._chanchal/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e6683c] to-[#bc1888] hover:opacity-90 font-bold text-xs text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <span>Open Instagram Profile</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : isLinkedIn ? (
          <div className="w-full h-full bg-gradient-to-br from-[#0c131f] via-[#101b2b] to-[#142338] flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#0077b5] flex items-center justify-center shadow-2xl mb-4">
              <FaLinkedin className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold">Ashish Chanchal on LinkedIn</h2>
            <p className="text-zinc-400 text-xs max-w-md mt-2 leading-relaxed">
              Software Developer & AI Systems Engineer · 10K+ Followers · Open for high-impact opportunities.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/in/ashishchanchal/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#0077b5] hover:bg-[#00669c] font-bold text-xs text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <span>Connect on LinkedIn</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : isTwitter ? (
          <div className="w-full h-full bg-gradient-to-br from-[#000000] via-[#111111] to-[#1a1a1a] flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-20 h-20 rounded-2xl bg-black border border-white/20 flex items-center justify-center shadow-2xl mb-4">
              <FaTwitter className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold">@ashishchanchal0 on X (Twitter)</h2>
            <p className="text-zinc-400 text-xs max-w-md mt-2 leading-relaxed">
              Follow along for tech breakthroughs, AI engineering thoughts, and real-time project updates.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://x.com/ashishchanchal0"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 font-bold text-xs text-black shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <span>Follow on X</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : isResumeDrive ? (
          <div className="w-full h-full bg-gradient-to-br from-[#12141a] via-[#1a1f2c] to-[#1e2638] flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-20 h-20 rounded-2xl bg-red-600 flex items-center justify-center shadow-2xl mb-4">
              <FaFilePdf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold">Ashish Chanchal — Resume PDF</h2>
            <p className="text-zinc-400 text-xs max-w-md mt-2 leading-relaxed">
              Full-Stack & AI Systems Engineer Resume · DRDO Biomedical ML Research & Sociantra Voice AI.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 font-bold text-xs text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <span>View Resume Document</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <iframe
            key={iframeKey}
            src={activeTab.url}
            title={activeTab.title}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; microphone; camera"
          />
        )}
      </div>
    </div>
  );
};

export default EdgeBrowserApp;
