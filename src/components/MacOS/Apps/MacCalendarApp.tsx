import React, { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
} from 'react-icons/fa';

interface CalendarEvent {
  id: string;
  day: number;
  time: string;
  title: string;
  location: string;
  category: 'work' | 'project' | 'social';
}

const EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    day: 15,
    time: '11:00 AM - 12:00 PM',
    title: 'Sociantra v2 Release & Architecture Review',
    location: 'Remote (Google Meet)',
    category: 'project',
  },
  {
    id: 'e2',
    day: 19,
    time: '3:00 PM - 4:00 PM',
    title: 'AI Systems & LLM Integrations Sync',
    location: 'Noida HQ / Virtual',
    category: 'work',
  },
  {
    id: 'e3',
    day: 22,
    time: '5:30 PM - 6:30 PM',
    title: 'Full Stack Open Source Community Call',
    location: 'Discord Stage',
    category: 'social',
  },
  {
    id: 'e4',
    day: 28,
    time: '10:00 AM - 11:30 AM',
    title: 'TODOAI Next-Gen Sprint Planning',
    location: 'Slack Huddle',
    category: 'project',
  },
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MacCalendarApp: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(19);
  const [currentMonth] = useState('September');
  const [currentYear] = useState(2026);

  // Generate 30 days starting on Tuesday (index 2)
  const firstDayOffset = 2; // Sept 1, 2026 starts on Tuesday
  const daysInMonth = 30;

  const selectedEvents = EVENTS.filter((e) => e.day === selectedDay);

  return (
    <div className="h-full flex bg-[#1e1e24] text-zinc-200 select-none text-xs font-sans overflow-hidden">
      {/* Left Sidebar - Agenda / Day View */}
      <div className="w-72 bg-[#16161b]/95 border-r border-white/10 flex flex-col p-4 flex-shrink-0">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="text-red-500 font-bold tracking-wider text-[11px] uppercase">
              {currentMonth} {currentYear}
            </div>
            <div className="text-2xl font-black text-white">Day {selectedDay}</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
            <FaCalendarAlt className="text-lg" />
          </div>
        </div>

        {/* Selected Day's Schedule */}
        <div className="flex-1 py-4 overflow-y-auto macos-scroll space-y-3">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Events Scheduled
          </div>

          {selectedEvents.length > 0 ? (
            selectedEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {evt.time}
                  </span>
                  <FaCheckCircle className="text-emerald-400 text-xs" />
                </div>
                <div className="font-semibold text-white text-xs leading-snug">
                  {evt.title}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <FaMapMarkerAlt className="text-red-400 text-[10px]" />
                  <span>{evt.location}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-zinc-500">
              <FaClock className="mx-auto text-lg mb-2 opacity-50" />
              <div>No events scheduled for this day</div>
              <div className="text-[10px] text-zinc-600 mt-1">
                Click days 15, 19, 22, or 28 to view key milestones
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Event Note */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-zinc-400">Ashish's Public Calendar</div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </div>
      </div>

      {/* Right Grid - Month View */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Month Navigation Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">
              {currentMonth} {currentYear}
            </h2>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button className="p-1.5 hover:bg-white/10 rounded text-zinc-300">
                <FaChevronLeft className="text-[10px]" />
              </button>
              <button className="p-1.5 hover:bg-white/10 rounded text-zinc-300">
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setSelectedDay(19)}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-white transition-colors"
          >
            Today
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 py-3 text-center text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 grid-rows-5 gap-2 flex-1">
          {/* Empty offset slots */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="rounded-xl border border-transparent bg-white/[0.02] opacity-30"
            />
          ))}

          {/* Actual Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNumber = i + 1;
            const isToday = dayNumber === 19;
            const isSelected = selectedDay === dayNumber;
            const hasEvent = EVENTS.some((e) => e.day === dayNumber);

            return (
              <div
                key={dayNumber}
                onClick={() => setSelectedDay(dayNumber)}
                className={`rounded-xl p-2 flex flex-col justify-between cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-500 shadow-md'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                      isToday
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'text-white'
                        : 'text-zinc-300'
                    }`}
                  >
                    {dayNumber}
                  </span>
                  {hasEvent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </div>

                {hasEvent && (
                  <div className="text-[9px] font-medium text-blue-300 truncate bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-400/30">
                    {EVENTS.find((e) => e.day === dayNumber)?.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MacCalendarApp;
