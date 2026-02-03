interface Props {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export default function Controls({ isRunning, onToggle, onReset }: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onToggle}
        className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold active:bg-gray-100 transition-colors text-sm"
      >
        {isRunning ? '⏸️ 일시정지' : '▶️ 재개'}
      </button>

      <button
        onClick={onReset}
        className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold active:bg-gray-100 transition-colors text-sm"
      >
        🔄 리셋
      </button>
    </div>
  );
}
