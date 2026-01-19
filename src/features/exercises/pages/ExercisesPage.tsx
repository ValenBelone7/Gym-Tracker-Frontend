/**
 * Página principal de exercises.
 */

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { ExerciseFilters } from '../components/ExerciseFilter';
import { ExerciseCard } from '../components/ExerciseCard';
import { CreateExerciseModal } from '../components/CreateExerciseModal';
import { useExercises } from '../hooks/useExercises';

export function ExercisesPage() {
  const [filters, setFilters] = useState({
    search: '',
    muscle_group: '',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { exercises, isLoading, error, totalCount, refresh } = useExercises(filters);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleExerciseClick = (exerciseId: number) => {
    // TODO: Abrir modal de detalle
    console.log('Exercise clicked:', exerciseId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ejercicios</h1>
          <p className="mt-2 text-gray-600">
            Catálogo de ejercicios globales y personalizados
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + Crear Ejercicio
        </Button>
      </div>

      {/* Filtros */}
      <ExerciseFilters onFilterChange={handleFilterChange} />

      {/* Contador */}
      {!isLoading && (
        <div className="text-sm text-gray-600">
          Mostrando <span className="font-medium">{exercises.length}</span> de{' '}
          <span className="font-medium">{totalCount}</span> ejercicios
        </div>
      )}

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

      {/* Lista de ejercicios */}
      {!isLoading && !error && (
        <>
          {exercises.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-gray-400 text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron ejercicios
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros o crea un ejercicio personalizado
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Crear Ejercicio
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onClick={() => handleExerciseClick(exercise.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal crear ejercicio */}
      <CreateExerciseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={refresh}
      />
    </div>
  );
}