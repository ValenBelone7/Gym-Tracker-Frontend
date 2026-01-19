/**
 * Hook para gestionar routines.
 */

import { useState, useEffect } from 'react';
import { routinesApi } from '../api/routinesApi';
import type { RoutineListItem } from '../types';

export function useRoutines() {
  const [routines, setRoutines] = useState<RoutineListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await routinesApi.list();
      setRoutines(data.results);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar rutinas');
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = () => {
    fetchRoutines();
  };

  return {
    routines,
    isLoading,
    error,
    refresh,
  };
}