/**
 * Card para mostrar un ejercicio.
 */

import type { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

const muscleGroupEmojis: Record<string, string> = {
  chest: '💪',
  back: '🔙',
  legs: '🦵',
  shoulders: '👐',
  arms: '💪',
  core: '🎯',
  cardio: '❤️',
  other: '⚡',
};

const muscleGroupColors: Record<string, string> = {
  chest: 'bg-red-100 text-red-800',
  back: 'bg-blue-100 text-blue-800',
  legs: 'bg-green-100 text-green-800',
  shoulders: 'bg-yellow-100 text-yellow-800',
  arms: 'bg-purple-100 text-purple-800',
  core: 'bg-pink-100 text-pink-800',
  cardio: 'bg-orange-100 text-orange-800',
  other: 'bg-gray-100 text-gray-800',
};

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {muscleGroupEmojis[exercise.muscle_group] || '⚡'}
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              {exercise.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                muscleGroupColors[exercise.muscle_group] || muscleGroupColors.other
              }`}
            >
              {exercise.muscle_group_display}
            </span>

            {exercise.is_global ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Global
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Personalizado
              </span>
            )}
          </div>
        </div>

        {/* Indicador de click */}
        <div className="ml-2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}