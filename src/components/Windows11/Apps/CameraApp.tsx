import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FaCamera, FaVideo, FaRedo, FaDownload, FaSyncAlt, FaPowerOff } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

declare global {
  interface Window {
    __activeCameraStream?: MediaStream | null;
  }
}

export const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [filter, setFilter] = useState<'normal' | 'cyber' | 'noir' | 'matrix'>('normal');
  const [flash, setFlash] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    // 1. Terminate global stream
    if (window.__activeCameraStream) {
      try {
        window.__activeCameraStream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      } catch {}
      window.__activeCameraStream = null;
    }

    // 2. Terminate local streamRef
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      } catch {}
      streamRef.current = null;
    }

    // 3. Terminate video element stream
    if (videoRef.current) {
      if (videoRef.current.srcObject) {
        try {
          const srcStream = videoRef.current.srcObject as MediaStream;
          srcStream.getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
        } catch {}
        videoRef.current.srcObject = null;
      }
      try {
        videoRef.current.pause();
      } catch {}
    }

    if (isMountedRef.current) {
      setCameraActive(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera();
    if (isMountedRef.current) {
      setPermissionError(null);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      });

      // If component was closed while prompt was pending
      if (!isMountedRef.current) {
        stream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        return;
      }

      window.__activeCameraStream = stream;
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (isMountedRef.current) {
            videoRef.current?.play().catch(() => {});
          }
        };
      }

      if (isMountedRef.current) {
        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Webcam permission or access error:', err);
      if (isMountedRef.current) {
        setPermissionError('Camera access required. Click "Enable Camera" or test with simulated telemetry.');
        setCameraActive(false);
      }
    }
  }, [stopCamera]);

  useEffect(() => {
    isMountedRef.current = true;
    startCamera();

    // Comprehensive unmount teardown
    return () => {
      isMountedRef.current = false;
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const takePhoto = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (cameraActive && video && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      // Mirror horizontally
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      // Futuristic telemetry avatar capture
      canvas.width = 640;
      canvas.height = 480;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 640, 480);

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
      for (let i = 0; i < 640; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 480);
        ctx.stroke();
      }
      for (let j = 0; j < 480; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(640, j);
        ctx.stroke();
      }

      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 3;
      ctx.strokeRect(180, 100, 280, 280);

      ctx.fillStyle = '#00e5ff';
      ctx.font = '16px monospace';
      ctx.fillText('[ASHISH BIOMETRIC TELEMETRY: VERIFIED]', 150, 80);
      ctx.fillText(`CAPTURE TIMESTAMP: ${new Date().toISOString()}`, 130, 420);
    }

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedPhotos((prev) => [dataUrl, ...prev.slice(0, 5)]);
  };

  const getFilterStyle = () => {
    let filterStr = '';
    switch (filter) {
      case 'cyber':
        filterStr = 'hue-rotate(180deg) contrast(150%) saturate(200%)';
        break;
      case 'noir':
        filterStr = 'grayscale(100%) contrast(140%)';
        break;
      case 'matrix':
        filterStr = 'hue-rotate(90deg) contrast(180%)';
        break;
      default:
        filterStr = 'none';
        break;
    }
    return {
      filter: filterStr,
      transform: 'scaleX(-1)',
    };
  };

  return (
    <div className="h-full flex flex-col bg-[#111113] text-white select-none relative overflow-hidden">
      {/* Top Header */}
      <div className="p-3 bg-[#18181c] border-b border-white/10 flex items-center justify-between z-10 text-xs">
        <div className="flex items-center gap-2">
          <img src={WIN11_ICONS.camera || WIN11_ICONS.photos} alt="Camera" className="w-5 h-5 object-contain" />
          <span className="font-bold">Windows Camera // Studio Vision</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Mode Selector */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
            {(['normal', 'cyber', 'noir', 'matrix'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-0.5 rounded uppercase text-[10px] font-bold transition-all ${
                  filter === f ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Camera Power Toggle */}
          <button
            onClick={() => (cameraActive ? stopCamera() : startCamera())}
            className={`p-1.5 rounded-lg text-xs transition-all flex items-center gap-1 border ${
              cameraActive
                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30'
                : 'bg-white/10 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title={cameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            <FaPowerOff className="w-3 h-3" />
            <span className="text-[10px] hidden sm:inline">{cameraActive ? 'Camera ON' : 'Camera OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
        {/* Flash Effect */}
        {flash && <div className="absolute inset-0 bg-white z-50 animate-fadeOut pointer-events-none" />}

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={getFilterStyle()}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            cameraActive ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
          }`}
        />

        {/* Fallback Screen when camera is inactive */}
        {!cameraActive && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-zinc-900 to-black relative p-6 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff10_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff10_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="w-64 h-64 border-2 border-blue-500/60 rounded-2xl relative flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-sm shadow-2xl">
              <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400 absolute -top-1 -left-1" />
              <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-400 absolute -top-1 -right-1" />
              <div className="w-8 h-8 border-b-2 border-l-2 border-cyan-400 absolute -bottom-1 -left-1" />
              <div className="w-8 h-8 border-b-2 border-r-2 border-cyan-400 absolute -bottom-1 -right-1" />

              <FaCamera className="w-10 h-10 text-cyan-400 mb-2 animate-pulse" />
              <div className="text-xs font-mono text-cyan-300 font-bold">CAMERA INACTIVE</div>
              <p className="text-[10px] text-zinc-400 font-mono mt-1">
                {permissionError || 'Camera is turned off'}
              </p>

              <button
                onClick={startCamera}
                className="mt-3 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all"
              >
                <FaSyncAlt className="w-3 h-3" />
                <span>Turn Camera On</span>
              </button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {/* Right Controls Ribbon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl z-20">
          <button
            onClick={() => setMode(mode === 'photo' ? 'video' : 'photo')}
            className="p-2.5 rounded-full hover:bg-white/10 text-zinc-300 transition-all"
            title="Switch Mode"
          >
            {mode === 'photo' ? <FaCamera className="w-4 h-4" /> : <FaVideo className="w-4 h-4 text-red-400" />}
          </button>

          {/* Shutter Button */}
          <button
            onClick={takePhoto}
            disabled={!cameraActive}
            className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-40"
          >
            <div className="w-full h-full rounded-full bg-white hover:bg-zinc-200 transition-all" />
          </button>

          <button
            onClick={() => setCapturedPhotos([])}
            className="p-2.5 rounded-full hover:bg-white/10 text-zinc-300 transition-all"
            title="Clear Gallery"
          >
            <FaRedo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Photo Strip */}
      {capturedPhotos.length > 0 && (
        <div className="p-2.5 bg-[#18181c] border-t border-white/10 flex items-center gap-2 overflow-x-auto win11-scroll z-10">
          <span className="text-[10px] text-zinc-400 font-bold px-2 uppercase tracking-wider">Captures:</span>
          {capturedPhotos.map((photo, i) => (
            <div key={i} className="relative group flex-shrink-0">
              <img src={photo} alt={`capture ${i}`} className="w-16 h-12 object-cover rounded-lg border border-white/20" />
              <a
                href={photo}
                download={`ashish_camera_${i + 1}.png`}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity"
              >
                <FaDownload className="text-white w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraApp;
