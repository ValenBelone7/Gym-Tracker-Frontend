/**
 * Página de lista de workouts (historial).
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardBody } from '@/shared/components/ui/Card';
import { workoutsApi } from '../api/workoutsApi';
import type { WorkoutListItem } from '../types';

export function WorkoutsPage() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await workoutsApi.list();
      setWorkouts(data.results);
    } catch (err) {
      console.error('Error loading workouts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewWorkout = async () => {
    try {
      const workout = await workoutsApi.create({
        date: new Date().toISOString().split('T')[0], // Fecha de hoy en formato YYYY-MM-DD
        notes: '',
      });
      navigate(`/workouts/${workout.id}`);
    } catch (err) {
      console.error('Error creating workout:', err);
      alert('Error al crear workout');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entrenamientos</h1>
          <p className="mt-2 text-gray-600">Historial de tus sesiones</p>
        </div>
        <Button onClick={handleNewWorkout}>
          + Nuevo Entrenamiento
        </Button>
      </div>

      {workouts.length === 0 ? (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏋️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sin entrenamientos
              </h3>
              <p className="text-gray-600 mb-4">
                Comienza tu primer entrenamiento ahora
              </p>
              <Button onClick={handleNewWorkout}>
                Empezar Entrenamiento
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-3">
          {workouts.map((workout) => (
            <Card
              key={workout.id}
              className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
              onClick={() => navigate(`/workouts/${workout.id}`)}
            >
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {workout.routine_name || 'Entrenamiento Libre'}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                      <span>{new Date(workout.date).toLocaleDateString()}</span>
                      {workout.duration && <span>{workout.duration} min</span>}
                      <span>{workout.exercise_count} ejercicios</span>
                      <span>{workout.total_volume.toFixed(1)} kg</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}