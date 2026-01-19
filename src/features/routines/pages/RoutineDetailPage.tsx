/**
 * Página de detalle de rutina.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/shared/components/ui/Card';
import { AddExerciseModal } from '../components/AddExerciseModal';
import { EditRoutineExerciseModal } from '../components/EditRoutineExerciseModal';
import { routinesApi } from '../api/routinesApi';
import type { Routine, RoutineExercise } from '../types';

export function RoutineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<RoutineExercise | null>(null);

  useEffect(() => {
    if (id) {
      fetchRoutine();
    }
  }, [id]);

  const fetchRoutine = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await routinesApi.get(parseInt(id));
      setRoutine(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar rutina');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm('¿Estás seguro de eliminar esta rutina?')) return;

    try {
      await routinesApi.delete(parseInt(id));
      navigate('/routines');
    } catch (err: any) {
      alert('Error al eliminar rutina');
    }
  };

  const handleRemoveExercise = async (exerciseId: number) => {
    if (!id || !confirm('¿Quitar este ejercicio de la rutina?')) return;

    try {
      const updated = await routinesApi.removeExercise(parseInt(id), exerciseId);
      setRoutine(updated);
    } catch (err: any) {
      alert('Error al quitar ejercicio');
    }
  };

  const handleStartWorkout = async () => {
    if (!id) return;

    try {
      const workout = await routinesApi.startWorkout(parseInt(id));
      navigate(`/workouts/${workout.id}`);
    } catch (err: any) {
      alert('Error al iniciar entrenamiento');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !routine) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || 'Rutina no encontrada'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/routines')}
            >
              ← Volver
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {routine.name}
            {routine.is_active && (
              <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800 font-normal">
                Activa
              </span>
            )}
          </h1>
          {routine.description && (
            <p className="mt-2 text-gray-600">{routine.description}</p>
          )}
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span>{routine.exercise_count} ejercicios</span>
            <span>~{routine.estimated_duration} minutos</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleStartWorkout}>
            Iniciar Entrenamiento
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </div>

      {/* Ejercicios */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Ejercicios</h2>
            <Button size="sm" onClick={() => setIsAddExerciseModalOpen(true)}>
              + Agregar Ejercicio
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {routine.routine_exercises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay ejercicios en esta rutina.
              <br />
              <button 
                onClick={() => setIsAddExerciseModalOpen(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Agrega el primero
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {routine.routine_exercises.map((re, index) => (
                <div
                  key={re.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-lg font-bold text-gray-400">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {re.exercise.name}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {re.target_sets} sets × {re.target_reps} reps
                        {re.notes && (
                          <span className="ml-2 text-gray-500">• {re.notes}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingExercise(re)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveExercise(re.id)}
                    >
                      Quitar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal agregar ejercicio */}
      <AddExerciseModal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setIsAddExerciseModalOpen(false)}
        onSuccess={fetchRoutine}
        routineId={parseInt(id!)}
        nextOrder={routine.routine_exercises.length}
      />

      {/* Modal editar ejercicio */}
      <EditRoutineExerciseModal
        isOpen={!!editingExercise}
        onClose={() => setEditingExercise(null)}
        onSuccess={fetchRoutine}
        routineId={parseInt(id!)}
        routineExercise={editingExercise}
      />
    </div>
  );
}