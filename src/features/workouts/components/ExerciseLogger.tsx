/**
 * Componente para loggear un ejercicio dentro del workout.
 */

import { useState } from 'react';
import { Card, CardBody } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { SetInput } from './SetInput';
import type { WorkoutExercise } from '../types';

interface ExerciseLoggerProps {
  workoutId: number;
  exercise: WorkoutExercise;
  onUpdate: () => void;
  onRemove: () => void;
}

export function ExerciseLogger({ workoutId, exercise, onUpdate, onRemove }: ExerciseLoggerProps) {
  const [showAddSet, setShowAddSet] = useState(false);

  const nextSetNumber = exercise.sets.length + 1;

  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {exercise.exercise.name}
            </h3>
            <div className="text-sm text-gray-600 mt-1">
              {exercise.exercise.muscle_group_display}
              {exercise.sets.length > 0 && (
                <span className="ml-3">
                  {exercise.sets.length} sets • Volumen: {exercise.total_volume.toFixed(1)} kg
                </span>
              )}
            </div>
            {exercise.notes && (
              <p className="text-sm text-gray-500 mt-1 italic">{exercise.notes}</p>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={onRemove}>
            Quitar
          </Button>
        </div>

        {/* Sets existentes */}
        {exercise.sets.length > 0 && (
          <div className="space-y-2 mb-3">
            {exercise.sets.map((set) => (
              <SetInput
                key={set.id}
                workoutId={workoutId}
                workoutExerciseId={exercise.id}
                setNumber={set.set_number}
                existingSet={set}
                onSuccess={onUpdate}
              />
            ))}
          </div>
        )}

        {/* Agregar nuevo set */}
        {showAddSet ? (
          <SetInput
            workoutId={workoutId}
            workoutExerciseId={exercise.id}
            setNumber={nextSetNumber}
            onSuccess={() => {
              setShowAddSet(false);
              onUpdate();
            }}
          />
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAddSet(true)}
            className="w-full"
          >
            + Agregar Set {nextSetNumber}
          </Button>
        )}
      </CardBody>
    </Card>
  );
}