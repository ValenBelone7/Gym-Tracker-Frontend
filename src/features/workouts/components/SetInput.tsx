/**
 * Componente para registrar un set.
 */

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { workoutsApi } from '../api/workoutsApi';
import type { WorkoutSet } from '../types';

interface SetInputProps {
  workoutId: number;
  workoutExerciseId: number;
  setNumber: number;
  existingSet?: WorkoutSet;
  onSuccess: () => void;
}

export function SetInput({
  workoutId,
  workoutExerciseId,
  setNumber,
  existingSet,
  onSuccess,
}: SetInputProps) {
  const [weight, setWeight] = useState(existingSet?.weight?.toString() || '');
  const [reps, setReps] = useState(existingSet?.reps?.toString() || '');
  const [rpe, setRpe] = useState(existingSet?.rpe?.toString() || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reps || parseInt(reps) <= 0) {
      alert('Las repeticiones son obligatorias');
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        set_number: setNumber,
        weight: weight ? parseFloat(weight) : null,
        reps: parseInt(reps),
        completed: true,
        rpe: rpe ? parseInt(rpe) : null,
      };

      if (existingSet) {
        await workoutsApi.updateSet(workoutId, workoutExerciseId, existingSet.id, data);
      } else {
        await workoutsApi.addSet(workoutId, workoutExerciseId, data);
      }

      onSuccess();
    } catch (err: any) {
      alert('Error al registrar set');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingSet || !confirm('¿Borrar este set?')) return;

    setIsLoading(true);

    try {
      await workoutsApi.deleteSet(workoutId, workoutExerciseId, existingSet.id);
      onSuccess();
    } catch (err: any) {
      alert('Error al borrar set');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg">
      <span className="text-sm font-medium text-gray-600 w-12">
        Set {setNumber}
      </span>

      <input
        type="number"
        placeholder="Peso (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        step="0.5"
        min="0"
        className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <span className="text-gray-400">×</span>

      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        min="1"
        required
        className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="RPE"
        value={rpe}
        onChange={(e) => setRpe(e.target.value)}
        min="1"
        max="10"
        className="w-16 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Button
        size="sm"
        onClick={handleSubmit}
        disabled={isLoading || !reps}
        isLoading={isLoading}
      >
        {existingSet ? '✓' : '+'}
      </Button>

      {existingSet && (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          disabled={isLoading}
        >
          ✕
        </Button>
      )}
    </div>
  );
}