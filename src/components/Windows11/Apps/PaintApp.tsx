import React, { useRef, useState, useEffect } from 'react';
import { FaEraser, FaPaintBrush, FaTrash, FaDownload, FaUndo } from 'react-icons/fa';

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00e5ff');
  const [brushSize, setBrushSize] = useState(4);
  const [mode, setMode] = useState<'brush' | 'eraser'>('brush');
  const [history, setHistory] = useState<ImageData[]>([]);

  const COLORS = [
    '#ffffff',
    '#000000',
    '#ff0055',
    '#00e5ff',
    '#00ff66',
    '#ffcc00',
    '#9d4edd',
    '#ff6b35',
    '#3a86ff',
    '#8338ec',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill initial canvas with dark background
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), data]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (mode === 'eraser') {
      ctx.strokeStyle = '#18181b';
    } else {
      ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'ashish_paint_sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-full flex flex-col bg-[#1f1f23] text-white select-none">
      {/* Top Paint Ribbon Toolbar */}
      <div className="p-2.5 bg-[#18181b] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Tools */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setMode('brush')}
            className={`p-2 rounded flex items-center gap-1.5 transition-all ${
              mode === 'brush' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:bg-white/10'
            }`}
            title="Brush"
          >
            <FaPaintBrush />
            <span className="hidden sm:inline">Brush</span>
          </button>
          <button
            onClick={() => setMode('eraser')}
            className={`p-2 rounded flex items-center gap-1.5 transition-all ${
              mode === 'eraser' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:bg-white/10'
            }`}
            title="Eraser"
          >
            <FaEraser />
            <span className="hidden sm:inline">Eraser</span>
          </button>
        </div>

        {/* Brush Sizes */}
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
          <span className="text-zinc-400 text-[11px]">Size:</span>
          {[2, 4, 8, 16].map((size) => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                brushSize === size ? 'bg-white/20 font-bold text-blue-400 border border-blue-500' : 'text-zinc-400 hover:bg-white/10'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-lg border border-white/5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setMode('brush');
              }}
              style={{ backgroundColor: c }}
              className={`w-5 h-5 rounded-full transition-transform ${
                color === c && mode === 'brush' ? 'scale-125 ring-2 ring-blue-500 ring-offset-1 ring-offset-black' : 'hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="p-2 rounded bg-black/30 hover:bg-white/10 text-zinc-300 disabled:opacity-40"
            title="Undo"
          >
            <FaUndo />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 rounded bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 flex items-center gap-1"
            title="Clear"
          >
            <FaTrash />
          </button>
          <button
            onClick={downloadCanvas}
            className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow"
            title="Download Sketch"
          >
            <FaDownload className="w-3 h-3" />
            <span className="text-xs">Save</span>
          </button>
        </div>
      </div>

      {/* Main Drawing Canvas */}
      <div className="flex-1 overflow-hidden p-3 flex items-center justify-center bg-[#121214]">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border border-white/10 rounded-lg shadow-2xl bg-[#18181b] cursor-crosshair max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default PaintApp;
