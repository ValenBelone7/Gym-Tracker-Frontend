/**
 * API calls para exercises.
 */

import apiClient from '@/shared/api/client';
import type { PaginatedResponse } from '@/shared/api/types';
import type { Exercise, ExerciseDetail, ExerciseCreateRequest } from '../types';

interface ExercisesParams {
  page?: number;
  page_size?: number;
  search?: string;
  muscle_group?: string;
  is_global?: boolean;
}

export const exercisesApi = {
  /**
   * Listar ejercicios con filtros
   */
  list: async (params?: ExercisesParams): Promise<PaginatedResponse<Exercise>> => {
    const response = await apiClient.get<PaginatedResponse<Exercise>>('/exercises/', {
      params,
    });
    return response.data;
  },

  /**
   * Obtener detalle de un ejercicio
   */
  get: async (id: number): Promise<ExerciseDetail> => {
    const response = await apiClient.get<ExerciseDetail>(`/exercises/${id}/`);
    return response.data;
  },

  /**
   * Crear ejercicio custom
   */
  create: async (data: ExerciseCreateRequest): Promise<ExerciseDetail> => {
    const response = await apiClient.post<ExerciseDetail>('/exercises/', data);
    return response.data;
  },

  /**
   * Actualizar ejercicio custom
   */
  update: async (id: number, data: Partial<ExerciseCreateRequest>): Promise<ExerciseDetail> => {
    const response = await apiClient.patch<ExerciseDetail>(`/exercises/${id}/`, data);
    return response.data;
  },

  /**
   * Borrar ejercicio custom
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/exercises/${id}/`);
  },
};