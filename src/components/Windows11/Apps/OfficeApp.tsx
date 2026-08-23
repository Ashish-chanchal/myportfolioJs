import React, { useState } from 'react';
import { WIN11_ICONS } from '../icons';

interface OfficeAppProps {
  type: 'excel' | 'powerpoint';
}

export const OfficeApp: React.FC<OfficeAppProps> = ({ type }) => {
  // Excel Data
  const [gridData, setGridData] = useState<string[][]>([
    ['Metric / Project', 'Impact / Latency', 'Tech Stack', 'Status'],
    ['Sociantra AI Voice', 'Cut latency < 3s', 'React, Azure, FastAudio', 'Production Ready'],
    ['DRDO Telemetry ML', '98.4% Accuracy', 'PyTorch, CUDA, Python', 'Verified'],
    ['TODOAI Orchestrator', '80% Breakdown Auto', 'Node.js, MCP, SQLite', 'Operational'],
    ['VibePulse 3D Audio', 'Locked 60 FPS', 'Three.js, WebGL, AudioAPI', 'Live'],
    ['CineVerse Streaming', 'Instant Curation', 'React, REST API, Tailwind', 'Live'],
  ]);

  // PowerPoint Slides
  const [activeSlide, setActiveSlide] = useState(0);
  const SLIDES = [
    {
      title: 'Architecting High-Throughput Web & AI Systems',
      subtitle: 'Ashish Chanchal — Full-Stack & AI Systems Engineer',
      bullets: [
        'Specializing in microservices, low-latency audio pipelines, and deep learning',
        'Proven track record across DRDO biomedical research & real-time conversational platforms',
        'Available for High-Impact Software Engineering opportunities',
      ],
    },
    {
      title: 'Sociantra — Real-Time Voice Streaming Platform',
      subtitle: 'Architecture & Latency Engineering',
      bullets: [
        'Bidirectional WebSocket audio streaming protocol',
        'Cut end-to-end turnaround latency from 15s to under 3s',
        'Azure Cloud Speech Synthesis integration with zero buffer drops',
      ],
    },
    {
      title: 'Biomedical Deep Learning Research (DRDO)',
      subtitle: 'Clinical Telemetry Anomaly Classification',
      bullets: [
        'Engineered multi-channel feature encoders for time-series physiological data',
        'Optimized neural inference to sub-millisecond per-sample throughput on CUDA',
        'Direct application to mission-critical healthcare diagnostics',
      ],
    },
  ];

  if (type === 'excel') {
    return (
      <div className="h-full flex flex-col bg-[#107c41] text-white select-none">
        {/* Ribbon Header */}
        <div className="p-2.5 bg-[#107c41] flex items-center justify-between border-b border-white/20 text-xs">
          <div className="flex items-center gap-2">
            <img src={WIN11_ICONS.excel} alt="Excel" className="w-5 h-5 object-contain" />
            <span className="font-bold">Engineering_Impact_Metrics.xlsx — Excel</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="bg-emerald-900/60 px-2 py-0.5 rounded">Formulas: SUM, AVERAGE, COUNT</span>
          </div>
        </div>

        {/* Spreadsheet Area */}
        <div className="flex-1 bg-[#1e1e1e] overflow-auto win11-scroll text-xs">
          <table className="w-full border-collapse">
            <tbody>
              {gridData.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx === 0 ? 'bg-[#2d2d30] font-bold text-emerald-400' : 'hover:bg-white/5'}>
                  <td className="w-10 text-center py-1.5 px-2 bg-[#252528] text-zinc-500 border border-white/10 font-mono text-[10px]">
                    {rIdx + 1}
                  </td>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="border border-white/10 p-2 text-zinc-200">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => {
                          const updated = [...gridData];
                          updated[rIdx][cIdx] = e.target.value;
                          setGridData(updated);
                        }}
                        className="bg-transparent w-full outline-none text-xs"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // PowerPoint Presentation Viewer
  return (
    <div className="h-full flex flex-col bg-[#c43e1c] text-white select-none">
      {/* Header */}
      <div className="p-2.5 bg-[#c43e1c] flex items-center justify-between border-b border-white/20 text-xs">
        <div className="flex items-center gap-2">
          <img src={WIN11_ICONS.powerpoint} alt="PowerPoint" className="w-5 h-5 object-contain" />
          <span className="font-bold">Ashish_Engineering_Keynote.pptx — PowerPoint</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="bg-red-950/60 px-2 py-0.5 rounded">Slide {activeSlide + 1} of {SLIDES.length}</span>
        </div>
      </div>

      <div className="flex-1 flex bg-[#1e1e1e] overflow-hidden">
        {/* Slide Thumbnails */}
        <div className="w-44 bg-[#141414] border-r border-white/10 p-2 space-y-2 overflow-y-auto win11-scroll flex-shrink-0">
          {SLIDES.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                activeSlide === idx ? 'border-[#c43e1c] bg-[#c43e1c]/20' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="text-[9px] text-zinc-400">Slide {idx + 1}</div>
              <div className="text-[11px] font-bold text-white truncate">{s.title}</div>
            </div>
          ))}
        </div>

        {/* Active Slide Canvas */}
        <div className="flex-1 p-6 flex items-center justify-center bg-[#181818]">
          <div className="w-full max-w-2xl bg-[#242428] rounded-xl p-8 shadow-2xl border border-white/10 space-y-4">
            <h1 className="text-xl font-bold text-white leading-snug border-b border-white/10 pb-3">
              {SLIDES[activeSlide].title}
            </h1>
            <h3 className="text-sm font-semibold text-[#ff8c69]">
              {SLIDES[activeSlide].subtitle}
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed pt-2 list-disc pl-5">
              {SLIDES[activeSlide].bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeApp;
