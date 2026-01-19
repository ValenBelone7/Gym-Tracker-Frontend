/**
 * Hook para gestionar exercises.
 */

import { useState, useEffect } from 'react';
import { exercisesApi } from '../api/exercisesApi';
import type { Exercise } from '../types';

interface UseExercisesParams {
  search?: string;
  muscle_group?: string;
  is_global?: boolean;
}

export function useExercises(params?: UseExercisesParams) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, [page, params?.search, params?.muscle_group, params?.is_global]);

  const fetchExercises = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await exercisesApi.list({
        page,
        ...params,
      });

      setExercises(data.results);
      setTotalCount(data.count);
      setHasNext(!!data.next);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar ejercicios');
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = () => {
    fetchExercises();
  };

  return {
    exercises,
    isLoading,
    error,
    page,
    setPage,
    totalCount,
    hasNext,
    refresh,
  };
}