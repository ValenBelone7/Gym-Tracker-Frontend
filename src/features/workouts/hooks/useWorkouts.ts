/**
 * Hook para gestionar un workout individual.
 */

import { useState, useEffect, useCallback } from 'react';
import { workoutsApi } from '../api/workoutsApi';
import type { Workout } from '../types';

export function useWorkout(workoutId: number | null) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkout = useCallback(async () => {
    if (!workoutId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await workoutsApi.get(workoutId);
      setWorkout(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar workout');
    } finally {
      setIsLoading(false);
    }
  }, [workoutId]);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  const refresh = () => {
    fetchWorkout();
  };

  const updateWorkout = (updatedWorkout: Workout) => {
    setWorkout(updatedWorkout);
  };

  return {
    workout,
    isLoading,
    error,
    refresh,
    updateWorkout,
  };
}