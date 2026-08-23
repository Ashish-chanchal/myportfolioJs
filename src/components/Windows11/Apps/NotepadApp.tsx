import React, { useState } from 'react';

const INITIAL_TEXT = `========================================================================
  ABOUT_ASHISH_CHANCHAL.TXT — DEVELOPER & AI SYSTEMS CHRONICLE
========================================================================

NAME:        Ashish Chanchal
ROLE:        Software Developer & AI Systems Engineer
LOCATION:    Noida, Uttar Pradesh, India (UTC+5:30)
EMAIL:       akchanchal2002@gmail.com
EXPERTISE:   Full-Stack Systems, Real-Time Audio AI, Clinical ML Models

------------------------------------------------------------------------
[1] THE ENGINEERING PHILOSOPHY
------------------------------------------------------------------------
I approach software engineering with ruthless discipline:
- Zero tolerance for avoidable latency and memory overhead.
- Systems must be self-healing, type-safe, and architected for continuous delivery.
- Frontend experiences should not just display information; they should wow users 
  with fluid 60 FPS physics and intuitive ergonomics.

------------------------------------------------------------------------
[2] EXPEDITIONS & PROVEN IMPACT
------------------------------------------------------------------------
• SOCIANTRA CONVERSATIONAL VOICE AI:
  Architected real-time WebSocket audio streaming pipelines on Azure Cloud, 
  reducing conversational response latency from 15 seconds down to <3 seconds.

• DRDO (DEFENCE RESEARCH & DEVELOPMENT ORG):
  Trained clinical predictive machine learning neural nets on multi-dimensional 
  biomedical telemetry, optimizing feature selection and validation pipelines.

• TODOAI MCP AGENT SYSTEM:
  Implemented Model Context Protocol agents automating task breakdown by 80% 
  with intelligent background cron orchestration.

• VIBEPULSE 3D WEB AUDIO:
  Engineered real-time reactive WebGL shaders in Three.js sustaining locked 
  60 FPS audio visual computing.

------------------------------------------------------------------------
[3] COMMUNICATIONS & COLLABORATION
------------------------------------------------------------------------
Looking for high-impact software engineering roles, distributed backend architectures, 
or AI advisory appointments.

Reach out directly:
- Email:    akchanchal2002@gmail.com
- LinkedIn: https://www.linkedin.com/in/ashishchanchal/
- GitHub:   https://github.com/Ashish-chanchal

[EOF]
`;

export const NotepadApp: React.FC = () => {
  const [content, setContent] = useState(INITIAL_TEXT);

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-zinc-200 text-xs font-mono select-text">
      {/* Notepad Menu Bar */}
      <div className="flex items-center gap-4 px-3 py-1 bg-[#252525] border-b border-white/10 text-zinc-400 text-[11px] select-none">
        <span className="hover:text-white cursor-pointer">File</span>
        <span className="hover:text-white cursor-pointer">Edit</span>
        <span className="hover:text-white cursor-pointer">View</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400">About_Ashish.txt — UTF-8</span>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-4 overflow-y-auto win11-scroll bg-[#1b1b1b]">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none resize-none text-zinc-200 font-mono text-xs leading-relaxed win11-scroll"
          spellCheck={false}
        />
      </div>

      {/* Notepad Status Bar */}
      <div className="px-4 py-1 bg-[#202020] border-t border-white/10 text-[10px] text-zinc-500 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-6">
          <span>Ln {content.split('\n').length}, Col 1</span>
          <span>{content.length} characters</span>
        </div>
        <div className="flex items-center gap-4">
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};

export default NotepadApp;
