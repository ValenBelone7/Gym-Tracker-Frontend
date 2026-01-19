/**
 * Página de workout logger (entrenamiento activo).
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/shared/components/ui/Card';
import { ExerciseLogger } from '../components/ExerciseLogger';
import { useWorkout } from '../hooks/useWorkouts';
import { workoutsApi } from '../api/workoutsApi';
import { exercisesApi } from '@/features/exercises/api/exercisesApi';
import { MUSCLE_GROUPS } from '@/features/exercises/types';

export function WorkoutLoggerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workoutId = id ? parseInt(id) : null;
  const { workout, isLoading, error, refresh } = useWorkout(workoutId);

  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');

  useEffect(() => {
    if (isAddingExercise) {
      fetchExercises();
    }
  }, [isAddingExercise, search, muscleGroup]);

  const fetchExercises = async () => {
    try {
      const data = await exercisesApi.list({ search, muscle_group: muscleGroup });
      setExercises(data.results);
    } catch (err) {
      console.error('Error loading exercises');
    }
  };

  const handleAddExercise = async () => {
    if (!workoutId || !selectedExerciseId) return;

    try {
      await workoutsApi.addExercise(workoutId, {
        exercise_id: selectedExerciseId,
        order: workout?.workout_exercises.length || 0,
      });
      setIsAddingExercise(false);
      setSelectedExerciseId(null);
      setSearch('');
      setMuscleGroup('');
      refresh();
    } catch (err: any) {
      alert('Error al agregar ejercicio');
    }
  };

  const handleRemoveExercise = async (exerciseId: number) => {
    if (!workoutId || !confirm('¿Quitar este ejercicio?')) return;

    try {
      await workoutsApi.removeExercise(workoutId, exerciseId);
      refresh();
    } catch (err) {
      alert('Error al quitar ejercicio');
    }
  };

  const handleFinish = async () => {
    if (!workoutId) return;
    
    // Verificar si ya está finalizado
    if (workout?.end_time) {
      if (!confirm('Este entrenamiento ya fue finalizado. ¿Volver a la lista?')) return;
      navigate('/workouts');
      return;
    }
    
    if (!confirm('¿Finalizar entrenamiento?')) return;

    try {
      await workoutsApi.finish(workoutId);
      navigate('/workouts');
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Error al finalizar workout';
      alert(errorMsg);
    }
  };

  const isFinished = workout?.end_time !== null && workout?.end_time !== undefined;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || 'Workout no encontrado'}
      </div>
    );
  }

  const duration = workout.duration || 0;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {workout.routine_name || 'Entrenamiento Libre'}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <span>📅 {new Date(workout.date).toLocaleDateString()}</span>
              {workout.start_time && (
                <span>
                  ⏱️ {hours > 0 ? `${hours}h ` : ''}{minutes} min
                </span>
              )}
              <span>💪 {workout.exercise_count} ejercicios</span>
              <span>📊 {workout.total_volume.toFixed(1)} kg</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate('/workouts')}>
              {isFinished ? 'Volver' : 'Guardar y Salir'}
            </Button>
            {!isFinished ? (
              <Button onClick={handleFinish}>
                Finalizar Entrenamiento
              </Button>
            ) : (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Finalizado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ejercicios */}
      {workout.workout_exercises.map((exercise) => (
        <ExerciseLogger
          key={exercise.id}
          workoutId={workout.id}
          exercise={exercise}
          onUpdate={refresh}
          onRemove={() => handleRemoveExercise(exercise.id)}
        />
      ))}

      {/* Agregar ejercicio */}
      {isAddingExercise ? (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Agregar Ejercicio</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <select
                  value={muscleGroup}
                  onChange={(e) => setMuscleGroup(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Todos</option>
                  {MUSCLE_GROUPS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              <div className="border border-gray-300 rounded-md max-h-64 overflow-y-auto">
                {exercises.map((ex) => (
                  <label
                    key={ex.id}
                    className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      selectedExerciseId === ex.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedExerciseId === ex.id}
                      onChange={() => setSelectedExerciseId(ex.id)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-3 text-sm font-medium">{ex.name}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsAddingExercise(false);
                    setSelectedExerciseId(null);
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddExercise}
                  disabled={!selectedExerciseId}
                  className="flex-1"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Button
          variant="secondary"
          onClick={() => setIsAddingExercise(true)}
          className="w-full"
        >
          + Agregar Ejercicio
        </Button>
      )}
    </div>
  );
}