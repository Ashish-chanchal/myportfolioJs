import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaBell } from 'react-icons/fa';

interface CalendarFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarFlyout: React.FC<CalendarFlyoutProps> = ({ isOpen }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const currentYear = time.getFullYear();
  const currentMonth = time.getMonth();
  const currentDay = time.getDate();

  // Days in month calculation
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-14 right-4 w-84 win11-mica rounded-xl p-5 flex flex-col gap-4 z-[9999] shadow-2xl animate-cinematic-zoom select-none text-xs"
    >
      {/* Big Clock Header */}
      <div className="border-b border-white/10 pb-3">
        <div className="text-3xl font-light text-white font-mono">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="text-xs text-blue-400 font-medium mt-0.5">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Interactive Calendar Month Matrix */}
      <div>
        <div className="flex items-center justify-between font-bold text-white mb-3">
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white">
              <FaChevronLeft className="w-2.5 h-2.5" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white">
              <FaChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-zinc-500 mb-1">
          {dayNames.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        {/* Days Matrix */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
          {Array.from({ length: firstDay }).map((_, i) => (
            <span key={`empty-${i}`} className="p-1 text-zinc-700">·</span>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === currentDay;
            return (
              <span
                key={dayNum}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  isToday ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-zinc-300 hover:bg-white/10'
                }`}
              >
                {dayNum}
              </span>
            );
          })}
        </div>
      </div>

      {/* Notifications Drawer */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-white">
          <span className="flex items-center gap-1.5">
            <FaBell className="text-amber-400 w-3 h-3" />
            <span>Notifications</span>
          </span>
          <span className="text-[10px] text-blue-400 hover:underline cursor-pointer">Clear all</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#1a1a1f] border border-white/5 space-y-1 text-[11px]">
          <div className="font-bold text-white">Portfolio System Live</div>
          <div className="text-[10px] text-zinc-400 leading-snug">
            All 5 design modes and Windows 11 environment fully operational.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFlyout;
