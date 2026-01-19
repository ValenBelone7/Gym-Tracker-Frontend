/**
 * Página de rutinas.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { RoutineCard } from '../components/RoutineCard';
import { CreateRoutineModal } from '../components/CreateRoutineModal';
import { useRoutines } from '../hooks/useRoutines';

export function RoutinesPage() {
  const navigate = useNavigate();
  const { routines, isLoading, error, refresh } = useRoutines();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleRoutineClick = (routineId: number) => {
    navigate(`/routines/${routineId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Rutinas</h1>
          <p className="mt-2 text-gray-600">
            Crea y gestiona tus plantillas de entrenamiento
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + Nueva Rutina
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && routines.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay rutinas creadas
          </h3>
          <p className="text-gray-600 mb-4">
            Crea tu primera rutina para organizar tus entrenamientos
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Crear Primera Rutina
          </Button>
        </div>
      )}

      {/* Lista de rutinas */}
      {!isLoading && !error && routines.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onClick={() => handleRoutineClick(routine.id)}
            />
          ))}
        </div>
      )}

      {/* Modal crear rutina */}
      <CreateRoutineModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={refresh}
      />
    </div>
  );
}