import React, { useState, useEffect } from 'react';
import { FaMicrochip, FaCheckCircle } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

export const TaskManagerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'processes' | 'performance'>('performance');
  const [cpuLoad, setCpuLoad] = useState(14);
  const [ramLoad, setRamLoad] = useState(26);
  const [history, setHistory] = useState<number[]>([12, 14, 18, 15, 13, 14, 19, 16, 14, 15, 17, 14]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextCpu = Math.floor(Math.random() * 15) + 10;
      setCpuLoad(nextCpu);
      setRamLoad(26 + (Math.random() > 0.5 ? 1 : 0));
      setHistory((prev) => [...prev.slice(1), nextCpu]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const PROCESSES = [
    { name: 'NestJS Microservices Core', cpu: '4.2%', ram: '340 MB', status: 'Running (Healthy)', pid: 1042 },
    { name: 'Real-Time Voice WebSocket Daemon', cpu: '3.8%', ram: '210 MB', status: 'Streaming <3s', pid: 1890 },
    { name: 'Three.js WebGL GPU Compositor', cpu: '2.5%', ram: '480 MB', status: '60 FPS Active', pid: 2104 },
    { name: 'PyTorch Neural Diagnostic Worker', cpu: '1.9%', ram: '890 MB', status: 'Model Loaded', pid: 3412 },
    { name: 'TODOAI MCP Protocol Scheduler', cpu: '0.8%', ram: '140 MB', status: 'Listening Cron', pid: 4891 },
    { name: 'Vite Hot Module Replacement', cpu: '0.4%', ram: '115 MB', status: 'Standby', pid: 5173 },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1f1f22] text-zinc-200 text-xs select-none">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-2 bg-[#18181b] border-b border-white/10">
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-3 py-1.5 rounded-md font-medium text-xs flex items-center gap-2 transition-all ${
            activeTab === 'performance' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:bg-white/5'
          }`}
        >
          <FaMicrochip className="w-3.5 h-3.5" />
          <span>Performance</span>
        </button>
        <button
          onClick={() => setActiveTab('processes')}
          className={`px-3 py-1.5 rounded-md font-medium text-xs flex items-center gap-2 transition-all ${
            activeTab === 'processes' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:bg-white/5'
          }`}
        >
          <img src={WIN11_ICONS.taskManager} alt="Processes" className="w-3.5 h-3.5 object-contain" />
          <span>Processes ({PROCESSES.length})</span>
        </button>
      </div>

      {/* Content View */}
      {activeTab === 'performance' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar metrics */}
          <div className="w-48 bg-[#18181c] border-r border-white/10 p-2 space-y-1">
            <div className="p-2.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <div className="text-[10px] font-bold">CPU (24 Cores)</div>
              <div className="text-xl font-bold font-mono text-white">{cpuLoad}%</div>
              <div className="text-[9px] text-zinc-400 font-mono">5.80 GHz · i9-13900K</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#222228] text-zinc-300">
              <div className="text-[10px] font-bold text-zinc-400">Memory (DDR5)</div>
              <div className="text-xl font-bold font-mono text-white">8.4 / 32.0 GB</div>
              <div className="text-[9px] text-zinc-500 font-mono">{ramLoad}% in use</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#222228] text-zinc-300">
              <div className="text-[10px] font-bold text-zinc-400">Disk 0 (NVMe SSD)</div>
              <div className="text-lg font-bold font-mono text-white">0% Active</div>
              <div className="text-[9px] text-zinc-500 font-mono">742 GB free of 1 TB</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#222228] text-zinc-300">
              <div className="text-[10px] font-bold text-zinc-400">GPU 0 (RTX 4090)</div>
              <div className="text-lg font-bold font-mono text-white">18% Tensor</div>
              <div className="text-[9px] text-zinc-500 font-mono">4.2 / 24 GB VRAM</div>
            </div>
          </div>

          {/* Real-time CPU Live Chart */}
          <div className="flex-1 p-6 overflow-y-auto win11-scroll space-y-6">
            <div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                <div>
                  <h2 className="text-base font-bold text-white">CPU Performance Telemetry</h2>
                  <p className="text-[11px] text-zinc-400">13th Gen Intel(R) Core(TM) i9-13900K</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-2xl font-bold text-accent">{cpuLoad}%</span>
                  <span className="text-[10px] text-zinc-400 block">Utilization</span>
                </div>
              </div>

              {/* Sparkline Canvas Chart */}
              <div className="h-36 bg-[#121214] border border-white/10 rounded-lg mt-4 p-3 flex items-end gap-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
                {history.map((val, i) => (
                  <div key={i} className="flex-1 bg-accent/20 border-t-2 border-accent relative z-10 transition-all duration-500" style={{ height: `${val * 3}%` }}>
                    <div className="w-full h-full bg-accent/10" />
                  </div>
                ))}
              </div>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#161619] border border-white/5">
                <span className="text-[10px] text-zinc-500 block">Sockets / Cores</span>
                <span className="text-white font-bold">1 / 24</span>
              </div>
              <div className="p-2.5 rounded bg-[#161619] border border-white/5">
                <span className="text-[10px] text-zinc-500 block">Logical Processors</span>
                <span className="text-white font-bold">32 Threads</span>
              </div>
              <div className="p-2.5 rounded bg-[#161619] border border-white/5">
                <span className="text-[10px] text-zinc-500 block">L3 Cache</span>
                <span className="text-white font-bold">36.0 MB</span>
              </div>
              <div className="p-2.5 rounded bg-[#161619] border border-white/5">
                <span className="text-[10px] text-zinc-500 block">Virtualization</span>
                <span className="text-emerald-400 font-bold">Enabled (Hyper-V)</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Processes Table */
        <div className="flex-1 p-4 overflow-y-auto win11-scroll">
          <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-mono text-zinc-500 border-b border-white/10">
            <span className="col-span-6">Process Name</span>
            <span className="col-span-2">PID</span>
            <span className="col-span-2">CPU</span>
            <span className="col-span-2 text-right">Memory</span>
          </div>

          <div className="space-y-1 mt-1">
            {PROCESSES.map((proc, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-3 py-2 rounded items-center bg-[#18181c] border border-white/5 hover:bg-white/5 transition-all text-xs"
              >
                <span className="col-span-6 flex items-center gap-2 font-medium text-white truncate">
                  <FaCheckCircle className="text-emerald-400 w-3 h-3 flex-shrink-0" />
                  {proc.name}
                </span>
                <span className="col-span-2 font-mono text-[10px] text-zinc-400">{proc.pid}</span>
                <span className="col-span-2 font-mono text-accent font-bold">{proc.cpu}</span>
                <span className="col-span-2 text-right font-mono text-zinc-300">{proc.ram}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagerApp;
