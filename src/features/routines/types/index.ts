/**
 * Tipos para Routines.
 */

import type { Exercise } from '../../exercises/types';

export interface RoutineExercise {
  id: number;
  exercise: Exercise;
  order: number;
  target_sets: number;
  target_reps: number;
  notes: string;
  created_at: string;
}

export interface Routine {
  id: number;
  name: string;
  description: string;
  user: number;
  user_username: string;
  is_active: boolean;
  routine_exercises: RoutineExercise[];
  exercise_count: number;
  estimated_duration: number;
  created_at: string;
  updated_at: string;
}

export interface RoutineListItem {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  exercise_count: number;
  estimated_duration: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRoutineRequest {
  name: string;
  description: string;
  is_active?: boolean;
}

export interface AddExerciseToRoutineRequest {
  exercise_id: number;
  order: number;
  target_sets: number;
  target_reps: number;
  notes?: string;
}

export interface UpdateRoutineExerciseRequest {
  order?: number;
  target_sets?: number;
  target_reps?: number;
  notes?: string;
}