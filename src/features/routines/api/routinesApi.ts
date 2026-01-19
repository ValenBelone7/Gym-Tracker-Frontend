/**
 * API calls para routines.
 */

import apiClient from '@/shared/api/client';
import type { PaginatedResponse } from '@/shared/api/types';
import type {
  Routine,
  RoutineListItem,
  CreateRoutineRequest,
  AddExerciseToRoutineRequest,
  UpdateRoutineExerciseRequest,
} from '../types';

export const routinesApi = {
  /**
   * Listar rutinas del usuario
   */
  list: async (): Promise<PaginatedResponse<RoutineListItem>> => {
    const response = await apiClient.get<PaginatedResponse<RoutineListItem>>('/routines/');
    return response.data;
  },

  /**
   * Obtener detalle de una rutina
   */
  get: async (id: number): Promise<Routine> => {
    const response = await apiClient.get<Routine>(`/routines/${id}/`);
    return response.data;
  },

  /**
   * Crear rutina
   */
  create: async (data: CreateRoutineRequest): Promise<Routine> => {
    const response = await apiClient.post<Routine>('/routines/', data);
    return response.data;
  },

  /**
   * Actualizar rutina
   */
  update: async (id: number, data: Partial<CreateRoutineRequest>): Promise<Routine> => {
    const response = await apiClient.patch<Routine>(`/routines/${id}/`, data);
    return response.data;
  },

  /**
   * Borrar rutina
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/routines/${id}/`);
  },

  /**
   * Agregar ejercicio a rutina
   */
  addExercise: async (
    routineId: number,
    data: AddExerciseToRoutineRequest
  ): Promise<Routine> => {
    const response = await apiClient.post<Routine>(
      `/routines/${routineId}/exercises/`,
      data
    );
    return response.data;
  },

  /**
   * Actualizar ejercicio de rutina
   */
  updateExercise: async (
    routineId: number,
    exerciseId: number,
    data: UpdateRoutineExerciseRequest
  ): Promise<Routine> => {
    const response = await apiClient.patch<Routine>(
      `/routines/${routineId}/exercises/${exerciseId}/`,
      data
    );
    return response.data;
  },

  /**
   * Quitar ejercicio de rutina
   */
  removeExercise: async (routineId: number, exerciseId: number): Promise<Routine> => {
    const response = await apiClient.delete<Routine>(
      `/routines/${routineId}/exercises/${exerciseId}/`
    );
    return response.data;
  },

  /**
   * Iniciar workout desde rutina
   */
  startWorkout: async (routineId: number, data?: { notes?: string }) => {
    const response = await apiClient.post(
      `/routines/${routineId}/start-workout/`,
      data || {}
    );
    return response.data;
  },
};