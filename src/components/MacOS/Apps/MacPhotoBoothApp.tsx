import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FaCamera, FaDownload, FaSyncAlt, FaPowerOff, FaRedo } from 'react-icons/fa';

declare global {
  interface Window {
    __activeMacCameraStream?: MediaStream | null;
  }
}

export const MacPhotoBoothApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState<'normal' | 'cyber' | 'noir' | 'thermal'>('normal');
  const [flash, setFlash] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    // 1. Terminate global stream
    if (window.__activeMacCameraStream) {
      try {
        window.__activeMacCameraStream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      } catch {}
      window.__activeMacCameraStream = null;
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
          srcStream.getTracks().forEach((t) => {
            t.stop();
            t.enabled = false;
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

      if (!isMountedRef.current) {
        stream.getTracks().forEach((t) => {
          t.stop();
          t.enabled = false;
        });
        return;
      }

      window.__activeMacCameraStream = stream;
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
      if (isMountedRef.current) {
        setPermissionError('Camera access required. Click "Enable Camera" to begin.');
        setCameraActive(false);
      }
    }
  }, [stopCamera]);

  useEffect(() => {
    isMountedRef.current = true;
    startCamera();

    const handleBeforeUnload = () => {
      stopCamera();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      canvas.width = 640;
      canvas.height = 480;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = '#00e5ff';
      ctx.font = '16px monospace';
      ctx.fillText('[PHOTO BOOTH // MAC OS SEQUOIA]', 150, 240);
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
      case 'thermal':
        filterStr = 'invert(100%) hue-rotate(180deg) contrast(200%)';
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
      {/* Header Toolbar */}
      <div className="p-3 bg-[#18181c] border-b border-white/10 flex items-center justify-between z-10 text-xs">
        <span className="font-bold">Photo Booth</span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
            {(['normal', 'cyber', 'noir', 'thermal'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-0.5 rounded uppercase text-[10px] font-bold transition-all ${
                  filter === f ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => (cameraActive ? stopCamera() : startCamera())}
            className={`p-1.5 rounded-lg text-xs transition-all flex items-center gap-1 border ${
              cameraActive
                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
                : 'bg-white/10 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <FaPowerOff className="w-3 h-3" />
            <span className="text-[10px]">{cameraActive ? 'Camera ON' : 'Camera OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
        {flash && <div className="absolute inset-0 bg-white z-50 animate-fadeOut pointer-events-none" />}

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

        {!cameraActive && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-zinc-900 to-black p-6 text-center">
            <FaCamera className="w-12 h-12 text-zinc-500 mb-3" />
            <div className="font-bold text-sm text-zinc-300">Camera Inactive</div>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">{permissionError || 'Click below to enable webcam.'}</p>
            <button
              onClick={startCamera}
              className="mt-4 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <FaSyncAlt />
              <span>Enable Camera</span>
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {/* Shutter Button at bottom */}
        {cameraActive && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            <button
              onClick={takePhoto}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-red-600 hover:bg-red-500 transition-all flex items-center justify-center text-white">
                <FaCamera />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Photo Strip */}
      {capturedPhotos.length > 0 && (
        <div className="p-2.5 bg-[#18181c] border-t border-white/10 flex items-center gap-2 overflow-x-auto macos-scroll z-10">
          <span className="text-[10px] text-zinc-400 font-bold px-2 uppercase">Strip:</span>
          {capturedPhotos.map((photo, i) => (
            <div key={i} className="relative group flex-shrink-0">
              <img src={photo} alt={`capture ${i}`} className="w-16 h-12 object-cover rounded-lg border border-white/20" />
              <a
                href={photo}
                download={`ashish_photobooth_${i + 1}.png`}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity"
              >
                <FaDownload className="text-white w-3.5 h-3.5" />
              </a>
            </div>
          ))}
          <button
            onClick={() => setCapturedPhotos([])}
            className="p-2 text-zinc-400 hover:text-white ml-auto"
            title="Clear"
          >
            <FaRedo className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MacPhotoBoothApp;
