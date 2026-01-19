/**
 * Dashboard principal.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Card, CardHeader, CardBody } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { workoutsApi } from '@/features/workouts/api/workoutsApi';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalVolume: 0,
    activeRoutines: 0,
    currentStreak: 0,
  });
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const workoutsData = await workoutsApi.list();
      const workouts = workoutsData.results;
      
      // Calcular estadísticas
      const now = new Date();
      const thisMonth = workouts.filter((w: any) => {
        const workoutDate = new Date(w.date);
        return workoutDate.getMonth() === now.getMonth() && 
               workoutDate.getFullYear() === now.getFullYear();
      });

      setStats({
        totalWorkouts: thisMonth.length,
        totalVolume: thisMonth.reduce((sum: number, w: any) => sum + w.total_volume, 0),
        activeRoutines: 0, // TODO: obtener de API de rutinas
        currentStreak: 0, // TODO: calcular racha
      });

      setRecentWorkouts(workouts.slice(0, 5));
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleNewWorkout = async () => {
    setIsCreatingWorkout(true);
    try {
      const workout = await workoutsApi.create({
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      navigate(`/workouts/${workout.id}`);
    } catch (err) {
      console.error('Error creating workout:', err);
      alert('Error al crear entrenamiento');
      setIsCreatingWorkout(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.first_name || user?.username}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Aquí está el resumen de tu actividad
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              🏋️ Nuevo Entrenamiento
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600 mb-4">
              Inicia un workout desde tus rutinas o crea uno libre
            </p>
            <Button 
              className="w-full" 
              onClick={handleNewWorkout}
              isLoading={isCreatingWorkout}
              disabled={isCreatingWorkout}
            >
              Empezar ahora
            </Button>
          </CardBody>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              📋 Mis Rutinas
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600 mb-4">
              Crea y gestiona tus plantillas de entrenamiento
            </p>
            <Link to="/routines">
              <Button variant="secondary" className="w-full">
                Ver rutinas
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              💪 Ejercicios
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600 mb-4">
              Explora el catálogo o crea ejercicios personalizados
            </p>
            <Link to="/exercises">
              <Button variant="secondary" className="w-full">
                Ver ejercicios
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>

      {/* Stats placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody>
            <div className="text-sm font-medium text-gray-600">
              Entrenamientos
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {isLoadingStats ? '...' : stats.totalWorkouts}
            </div>
            <div className="mt-1 text-xs text-gray-500">Este mes</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-sm font-medium text-gray-600">
              Volumen Total
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {isLoadingStats ? '...' : Math.round(stats.totalVolume)} kg
            </div>
            <div className="mt-1 text-xs text-gray-500">Este mes</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-sm font-medium text-gray-600">
              Rutinas Activas
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {isLoadingStats ? '...' : stats.activeRoutines}
            </div>
            <div className="mt-1 text-xs text-gray-500">Total</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-sm font-medium text-gray-600">
              Racha Actual
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {isLoadingStats ? '...' : stats.currentStreak} días
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {stats.currentStreak === 0 ? 'Sin entrenar' : '¡Sigue así!'}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent workouts placeholder */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            Entrenamientos Recientes
          </h3>
        </CardHeader>
        <CardBody>
          {isLoadingStats ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : recentWorkouts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay entrenamientos registrados aún.
              <br />
              <button 
                onClick={handleNewWorkout}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ¡Comienza tu primer workout!
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentWorkouts.map((workout: any) => (
                <div
                  key={workout.id}
                  onClick={() => navigate(`/workouts/${workout.id}`)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {workout.routine_name || 'Entrenamiento Libre'}
                    </h4>
                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
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
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}