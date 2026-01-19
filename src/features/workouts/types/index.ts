/**
 * Tipos para Workouts.
 */

import type { Exercise } from '@/features/exercises/types';

export interface WorkoutSet {
  id: number;
  set_number: number;
  weight: number | null;
  reps: number;
  completed: boolean;
  rpe: number | null;
  volume: number;
  created_at: string;
}

export interface WorkoutExercise {
  id: number;
  exercise: Exercise;
  order: number;
  notes: string;
  sets: WorkoutSet[];
  total_volume: number;
  created_at: string;
}

export interface Workout {
  id: number;
  routine: number | null;
  routine_name: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  duration: number | null;
  notes: string;
  workout_exercises: WorkoutExercise[];
  total_volume: number;
  total_sets: number;
  exercise_count: number;
  created_at: string;
  updated_at: string;
}

export interface WorkoutListItem {
  id: number;
  routine_name: string | null;
  date: string;
  duration: number | null;
  total_volume: number;
  exercise_count: number;
  created_at: string;
}

export interface CreateWorkoutRequest {
  routine?: number;
  date?: string;
  notes?: string;
}

export interface AddExerciseToWorkoutRequest {
  exercise_id: number;
  order: number;
  notes?: string;
}

export interface CreateSetRequest {
  set_number: number;
  weight?: number | null;
  reps: number;
  completed?: boolean;
  rpe?: number | null;
}