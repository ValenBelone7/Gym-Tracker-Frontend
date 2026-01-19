/**
 * Tipos para Exercises.
 */

export interface Exercise {
  id: number;
  name: string;
  muscle_group: string;
  muscle_group_display: string;
  is_global: boolean;
  is_custom: boolean;
}

export interface ExerciseDetail {
  id: number;
  name: string;
  description: string;
  muscle_group: string;
  muscle_group_display: string;
  is_global: boolean;
  created_by: number | null;
  created_by_username: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExerciseCreateRequest {
  name: string;
  description: string;
  muscle_group: string;
}

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'cardio'
  | 'other';

export const MUSCLE_GROUPS: { value: MuscleGroup; label: string }[] = [
  { value: 'chest', label: 'Pecho' },
  { value: 'back', label: 'Espalda' },
  { value: 'legs', label: 'Piernas' },
  { value: 'shoulders', label: 'Hombros' },
  { value: 'arms', label: 'Brazos' },
  { value: 'core', label: 'Core' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'other', label: 'Otro' },
];