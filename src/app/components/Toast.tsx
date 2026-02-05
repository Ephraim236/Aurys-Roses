import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    info: 'bg-blue-500/90',
    success: 'bg-green-500/90',
    error: 'bg-red-500/90',
    warning: 'bg-amber-500/90',
  }[type];

  const icon = {
    info: 'ℹ️',
    success: '✓',
    error: '✕',
    warning: '⚠️',
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-pop-in max-w-sm`}>
      <span className="text-lg">{icon}</span>
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
        <X size={18} />
      </button>
    </div>
  );
}
