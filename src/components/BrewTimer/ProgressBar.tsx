interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="w-full h-1.5 bg-warm-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-brew-500 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}
