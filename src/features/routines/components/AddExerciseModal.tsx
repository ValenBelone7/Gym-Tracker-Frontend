/**
 * Modal para agregar ejercicios a una rutina.
 */

import { useState } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Button } from '@/shared/components/ui/Button';
import { useExercises } from '@/features/exercises/hooks/useExercises';
import { routinesApi } from '../api/routinesApi';
import { MUSCLE_GROUPS } from '@/features/exercises/types';

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  routineId: number;
  nextOrder: number;
}

export function AddExerciseModal({
  isOpen,
  onClose,
  onSuccess,
  routineId,
  nextOrder,
}: AddExerciseModalProps) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  const [targetSets, setTargetSets] = useState(3);
  const [targetReps, setTargetReps] = useState(10);
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { exercises, isLoading: isLoadingExercises } = useExercises({
    search,
    muscle_group: muscleGroup,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedExerciseId) {
      setError('Debes seleccionar un ejercicio');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await routinesApi.addExercise(routineId, {
        exercise_id: selectedExerciseId,
        order: nextOrder,
        target_sets: targetSets,
        target_reps: targetReps,
        notes,
      });

      // Reset form
      setSelectedExerciseId(null);
      setTargetSets(3);
      setTargetReps(10);
      setNotes('');
      setSearch('');
      setMuscleGroup('');

      onSuccess();
      onClose();
    } catch (err: any) {
      const errorData = err.response?.data;
      if (errorData?.exercise_id) {
        setError(errorData.exercise_id[0]);
      } else {
        setError('Error al agregar ejercicio');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setSelectedExerciseId(null);
      setTargetSets(3);
      setTargetReps(10);
      setNotes('');
      setSearch('');
      setMuscleGroup('');
      setError('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Ejercicio" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Paso 1: Seleccionar ejercicio */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">1. Seleccionar Ejercicio</h3>

          {/* Filtros */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Buscar ejercicio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los grupos</option>
              {MUSCLE_GROUPS.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de ejercicios */}
          <div className="border border-gray-300 rounded-md max-h-64 overflow-y-auto">
            {isLoadingExercises ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : exercises.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No se encontraron ejercicios
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {exercises.map((exercise) => (
                  <label
                    key={exercise.id}
                    className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedExerciseId === exercise.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="exercise"
                      value={exercise.id}
                      checked={selectedExerciseId === exercise.id}
                      onChange={() => setSelectedExerciseId(exercise.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {exercise.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {exercise.muscle_group_display}
                        {exercise.is_global ? (
                          <span className="ml-2 text-blue-600">• Global</span>
                        ) : (
                          <span className="ml-2 text-green-600">• Personalizado</span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Paso 2: Configurar sets/reps */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">2. Configurar Objetivo</h3>

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
        </div>

        {/* Paso 3: Notas (opcional) */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
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

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
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
            disabled={isLoading || !selectedExerciseId}
            className="flex-1"
          >
            Agregar Ejercicio
          </Button>
        </div>
      </form>
    </Modal>
  );
}