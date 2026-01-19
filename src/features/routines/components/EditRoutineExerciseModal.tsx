/**
 * Modal para editar configuración de un ejercicio en la rutina.
 */

import { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Button } from '@/shared/components/ui/Button';
import { routinesApi } from '../api/routinesApi';
import type { RoutineExercise } from '../types';

interface EditRoutineExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  routineId: number;
  routineExercise: RoutineExercise | null;
}

export function EditRoutineExerciseModal({
  isOpen,
  onClose,
  onSuccess,
  routineId,
  routineExercise,
}: EditRoutineExerciseModalProps) {
  const [targetSets, setTargetSets] = useState(3);
  const [targetReps, setTargetReps] = useState(10);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (routineExercise) {
      setTargetSets(routineExercise.target_sets);
      setTargetReps(routineExercise.target_reps);
      setNotes(routineExercise.notes || '');
    }
  }, [routineExercise]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!routineExercise) return;

    setError('');
    setIsLoading(true);

    try {
      await routinesApi.updateExercise(routineId, routineExercise.id, {
        target_sets: targetSets,
        target_reps: targetReps,
        notes,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError('Error al actualizar ejercicio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError('');
      onClose();
    }
  };

  if (!routineExercise) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Ejercicio" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-sm font-medium text-gray-900">
            {routineExercise.exercise.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {routineExercise.exercise.muscle_group_display}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="target_sets" className="block text-sm font-medium text-gray-700 mb-1">
              Series objetivo
            </label>
            <input
              id="target_sets"
              type="number"
              min="1"
              max="10"
              value={targetSets}
              onChange={(e) => setTargetSets(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="target_reps" className="block text-sm font-medium text-gray-700 mb-1">
              Repeticiones objetivo
            </label>
            <input
              id="target_reps"
              type="number"
              min="1"
              max="100"
              value={targetReps}
              onChange={(e) => setTargetReps(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notas
          </label>
          <input
            id="notes"
            type="text"
            placeholder="Ej: Descanso 2 min, tempo 3-0-1"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Modal>
  );
}