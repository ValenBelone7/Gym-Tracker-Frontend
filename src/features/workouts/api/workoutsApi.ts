/**
 * API calls para workouts.
 */

import apiClient from '@/shared/api/client';
import type { PaginatedResponse } from '@/shared/api/types';
import type {
  Workout,
  WorkoutListItem,
  CreateWorkoutRequest,
  AddExerciseToWorkoutRequest,
  CreateSetRequest,
} from '../types';

export const workoutsApi = {
  /**
   * Listar workouts del usuario
   */
  list: async (): Promise<PaginatedResponse<WorkoutListItem>> => {
    const response = await apiClient.get<PaginatedResponse<WorkoutListItem>>('/workouts/');
    return response.data;
  },

  /**
   * Obtener detalle de un workout
   */
  get: async (id: number): Promise<Workout> => {
    const response = await apiClient.get<Workout>(`/workouts/${id}/`);
    return response.data;
  },

  /**
   * Crear workout
   */
  create: async (data: CreateWorkoutRequest): Promise<Workout> => {
    const response = await apiClient.post<Workout>('/workouts/', data);
    return response.data;
  },

  /**
   * Actualizar workout
   */
  update: async (id: number, data: Partial<CreateWorkoutRequest>): Promise<Workout> => {
    const response = await apiClient.patch<Workout>(`/workouts/${id}/`, data);
    return response.data;
  },

  /**
   * Borrar workout
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/workouts/${id}/`);
  },

  /**
   * Agregar ejercicio a workout
   */
  addExercise: async (
    workoutId: number,
    data: AddExerciseToWorkoutRequest
  ): Promise<Workout> => {
    const response = await apiClient.post<Workout>(
      `/workouts/${workoutId}/exercises/`,
      data
    );
    return response.data;
  },

  /**
   * Quitar ejercicio de workout
   */
  removeExercise: async (workoutId: number, exerciseId: number): Promise<Workout> => {
    const response = await apiClient.delete<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseId}/`
    );
    return response.data;
  },

  /**
   * Agregar set a un ejercicio del workout
   */
  addSet: async (
    workoutId: number,
    exerciseId: number,
    data: CreateSetRequest
  ): Promise<Workout> => {
    const response = await apiClient.post<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseId}/sets/`,
      data
    );
    return response.data;
  },

  /**
   * Actualizar set
   */
  updateSet: async (
    workoutId: number,
    exerciseId: number,
    setId: number,
    data: Partial<CreateSetRequest>
  ): Promise<Workout> => {
    const response = await apiClient.patch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseId}/sets/${setId}/`,
      data
    );
    return response.data;
  },

  /**
   * Borrar set
   */
  deleteSet: async (
    workoutId: number,
    exerciseId: number,
    setId: number
  ): Promise<Workout> => {
    const response = await apiClient.delete<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseId}/sets/${setId}/`
    );
    return response.data;
  },

  /**
   * Finalizar workout
   */
  finish: async (workoutId: number): Promise<Workout> => {
    const response = await apiClient.post<Workout>(
      `/workouts/${workoutId}/finish/`
    );
    return response.data;
  },
};