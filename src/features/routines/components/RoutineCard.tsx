/**
 * Card para mostrar una rutina.
 */

import { Card, CardBody } from '@/shared/components/ui/Card';

interface RoutineListItem {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  exercise_count: number;
  estimated_duration: number;
  created_at: string;
  updated_at: string;
}

interface RoutineCardProps {
  routine: RoutineListItem;
  onClick: () => void;
}

export function RoutineCard({ routine, onClick }: RoutineCardProps) {
  return (
    <Card
      className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {routine.name}
              </h3>
              {routine.is_active && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Activa
                </span>
              )}
            </div>

            {routine.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {routine.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>{routine.exercise_count} ejercicios</span>
              </div>

              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>~{routine.estimated_duration} min</span>
              </div>
            </div>
          </div>

          <div className="ml-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}