import { useEffect, useRef, useState } from 'react';
import { FiCircle, FiAlertTriangle, FiFolder } from 'react-icons/fi';

type Resolution = {
  label: string;
  width: number;
  height: number;
  type: 'low' | 'medium' | 'high' | 'ultra' | 'max' | 'recommended';
};

const allResolutions: Resolution[] = [
  { label: '360p (Low)', width: 640, height: 360, type: 'low' },
  { label: '720p (HD)', width: 1280, height: 720, type: 'medium' },
  { label: '1080p (Full HD)', width: 1920, height: 1080, type: 'recommended' },
  { label: '1440p (QHD)', width: 2560, height: 1440, type: 'high' },
  { label: '4K (Ultra HD)', width: 3840, height: 2160, type: 'ultra' },
  { label: '8K (Super UHD)', width: 7680, height: 4320, type: 'ultra' },
];

const fpsOptions = [24, 30, 60, 120];

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [supportedRes, setSupportedRes] = useState<Resolution[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableFPS, setAvailableFPS] = useState<number[]>(fpsOptions);
  const [selectedRes, setSelectedRes] = useState<Resolution | null>(null);
  const [selectedFPS, setSelectedFPS] = useState(30);

  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);
  const [warning, setWarning] = useState('');
  const [filePath, setFilePath] = useState('');

  // Detect max supported resolution
  useEffect(() => {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => {
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      const capabilities = (track.getCapabilities?.() || {}) as any;

      const maxW = capabilities.width?.max || settings.width || 1920;
      const maxH = capabilities.height?.max || settings.height || 1080;

      const filtered = allResolutions.filter(r => r.width <= maxW && r.height <= maxH);
      const maxOption = {
        label: `Max (${maxW}x${maxH})`,
        width: maxW,
        height: maxH,
        type: 'max',
      } as Resolution;

      setSupportedRes([maxOption, ...filtered]);
      setSelectedRes(filtered.find(r => r.type === 'recommended') || maxOption);

      track.stop();
    });
  }, []);

  const startTimer = () => {
    setTimer(0);
    const id = setInterval(() => setTimer(t => t + 1), 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId);
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const startRecording = async () => {
    setWarning('');
    setFilePath('');

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: selectedRes!.width,
          height: selectedRes!.height,
          frameRate: selectedFPS,
        },
        audio: true,
      });

      const settings = stream.getVideoTracks()[0].getSettings();
      if (settings.width! < selectedRes!.width || settings.height! < selectedRes!.height) {
        setWarning('⚠️ Device does not support selected resolution. Using fallback.');
      }

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const now = new Date();
        const filename = `recording-${now.toISOString().replace(/[:.]/g, '-')}.webm`;

        chrome.downloads.download(
          {
            url,
            filename: `screen-recording/${filename}`,
            saveAs: false,
          },
          () => {
            setFilePath(`Downloads/screen-recording/${filename}`);
          }
        );
      };

      streamRef.current = stream;
      mediaRecorderRef.current = recorder;

      if (videoRef.current) videoRef.current.srcObject = stream;
      recorder.start();
      setRecording(true);
      startTimer();
    } catch (err) {
      console.error(err);
      setWarning('❌ Failed to start screen recording.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
    setRecording(false);
    stopTimer();
  };

  return (
    <div className="w-[350px] min-h-[400px] bg-gray-900 text-white p-5 rounded-xl shadow-xl flex flex-col gap-4">
      <h1 className="text-xl font-bold text-cyan-400">🎥 Neon Screen Recorder</h1>

      <div className="flex gap-2">
        <select
          className="bg-gray-800 border border-cyan-500 p-2 rounded w-full"
          value={selectedRes?.label}
          onChange={e => {
            const found = supportedRes.find(r => r.label === e.target.value);
            if (found) setSelectedRes(found);
          }}
        >
          {supportedRes.map(opt => (
            <option key={opt.label} value={opt.label}>
              {opt.label} {opt.type === 'recommended' ? '🌟' : ''}
            </option>
          ))}
        </select>

        <select
          className="bg-gray-800 border border-cyan-500 p-2 rounded w-[100px]"
          value={selectedFPS}
          onChange={e => setSelectedFPS(parseInt(e.target.value))}
        >
          {availableFPS.map(f => (
            <option key={f} value={f}>
              {f} FPS
            </option>
          ))}
        </select>
      </div>

      {recording && (
        <div className="flex items-center gap-2 text-red-400">
          <FiCircle className="animate-ping" /> Recording... {formatTime(timer)}
        </div>
      )}

      {warning && (
        <div className="text-yellow-400 text-sm flex gap-2 items-center">
          <FiAlertTriangle /> {warning}
        </div>
      )}

      <div className="flex gap-3">
        {!recording ? (
          <button
            onClick={startRecording}
            className="bg-cyan-400 text-black px-4 py-2 rounded w-full font-semibold shadow-md hover:brightness-110"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-pink-500 text-black px-4 py-2 rounded w-full font-semibold shadow-md hover:brightness-110"
          >
            ⏹ Stop
          </button>
        )}
      </div>

      {filePath && (
        <div className="bg-gray-800 p-3 rounded mt-2 text-sm">
          ✅ Saved to:
          <br />
          <code className="text-green-400">{filePath}</code>
          <br />
          <button
            className="mt-1 flex items-center gap-2 text-cyan-300 hover:underline"
            onClick={() => chrome.downloads.showDefaultFolder?.()}
          >
            <FiFolder /> Open folder
          </button>
        </div>
      )}

      <video ref={videoRef} className="hidden" autoPlay muted controls />
    </div>
  );
}
