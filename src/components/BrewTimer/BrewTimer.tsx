import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/useRecipes';
import { useTimer } from '../../hooks/useTimer';
import { useSound } from '../../hooks/useSound';
import { getStepStatus } from '../../hooks/useStepStatus';
import { calculateOverallProgress } from '../../utils/calculateProgress';
import type { StepStatus } from '../../types/recipe';
import TimerDisplay from './TimerDisplay';
import ProgressBar from './ProgressBar';
import StepList from './StepList';
import Controls from './Controls';

export default function BrewTimer() {
  const { id } = useParams();
  const { recipe, loading } = useRecipe(id);
  const navigate = useNavigate();
  const { playAlert, playStart, playComplete } = useSound();

  const lastStep = recipe?.steps[recipe.steps.length - 1];
  const totalTime = lastStep ? lastStep.time + (lastStep.duration ?? 0) : 0;

  const { elapsedTime, isRunning, isComplete, start, pause, resume, reset } =
    useTimer(totalTime);

  const prevStatusesRef = useRef<Map<number, StepStatus>>(new Map());
  const initializedRef = useRef(false);

  // Start timer once recipe is loaded
  useEffect(() => {
    if (!loading && recipe) {
      start();
    }
  }, [loading, recipe, start]);

  // Seed previous statuses so first transition triggers sounds
  useEffect(() => {
    if (recipe && !initializedRef.current) {
      recipe.steps.forEach((step) => {
        prevStatusesRef.current.set(step.id, 'pending');
      });
      initializedRef.current = true;
    }
  }, [recipe]);

  // Wake Lock — keep screen on while timer runs
  useEffect(() => {
    let wakeLock: { release: () => Promise<void> } | null = null;
    const request = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        }
      } catch {
        // Wake Lock not supported or denied — continue without it
      }
    };
    if (isRunning) request();
    return () => {
      if (wakeLock) wakeLock.release();
    };
  }, [isRunning]);

  // Sound & vibration on step-status transitions
  useEffect(() => {
    if (!recipe) return;

    recipe.steps.forEach((step) => {
      const current = getStepStatus(step, elapsedTime);
      const prev = prevStatusesRef.current.get(step.id);

      if (prev !== undefined && prev !== current) {
        if (current === 'upcoming' && prev === 'pending') {
          playAlert();
          navigator.vibrate?.(100);
        }
        if (current === 'active' && prev !== 'active') {
          playStart();
          navigator.vibrate?.([100, 50, 100]);
        }
      }

      prevStatusesRef.current.set(step.id, current);
    });
  }, [elapsedTime, recipe, playAlert, playStart]);

  // Navigate to completion screen when timer ends
  useEffect(() => {
    if (isComplete && recipe) {
      playComplete();
      navigator.vibrate?.([100, 50, 100, 50, 100]);
      navigate(`/recipe/${id}/complete`, { state: { actualTime: elapsedTime } });
    }
  }, [isComplete, recipe, id, elapsedTime, navigate, playComplete]);

  const handleToggle = useCallback(() => {
    if (isRunning) pause();
    else resume();
  }, [isRunning, pause, resume]);

  const handleReset = useCallback(() => {
    if (window.confirm('정말 처음부터 다시 시작하시겠습니까?')) {
      reset();
      navigate(`/recipe/${id}`);
    }
  }, [reset, navigate, id]);

  if (loading || !recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-warm-400">로딩...</p>
      </div>
    );
  }

  // Next step that has not yet started (upcoming or pending)
  const nextStep =
    recipe.steps.find((step) => {
      const status = getStepStatus(step, elapsedTime);
      return status === 'upcoming' || status === 'pending';
    }) ?? null;

  const progress = calculateOverallProgress(elapsedTime, totalTime);

  return (
    <div className="pb-24">
      {/* Sticky timer area */}
      <div className="sticky top-0 z-10 bg-white p-4 pb-2">
        <TimerDisplay elapsedTime={elapsedTime} nextStep={nextStep} />
        <ProgressBar progress={progress} />
      </div>

      <div className="mt-2 px-4">
        <StepList steps={recipe.steps} elapsedTime={elapsedTime} />
      </div>

      {/* Fixed bottom controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-warm-200">
        <div className="max-w-md mx-auto">
          <Controls isRunning={isRunning} onToggle={handleToggle} onReset={handleReset} />
        </div>
      </div>
    </div>
  );
}
