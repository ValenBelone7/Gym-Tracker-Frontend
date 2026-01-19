/**
 * Filtros para exercises.
 */

import { useState } from 'react';
import { MUSCLE_GROUPS } from '../types';

interface ExerciseFiltersProps {
  onFilterChange: (filters: {
    search: string;
    muscle_group: string;
    is_global?: boolean;
  }) => void;
}

export function ExerciseFilters({ onFilterChange }: ExerciseFiltersProps) {
  const [search, setSearch] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [filterType, setFilterType] = useState(''); // '' | 'global' | 'custom'

  const handleSearchChange = (value: string) => {
    setSearch(value);
    applyFilters({ search: value, muscle_group: muscleGroup, filter_type: filterType });
  };

  const handleMuscleGroupChange = (value: string) => {
    setMuscleGroup(value);
    applyFilters({ search, muscle_group: value, filter_type: filterType });
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    applyFilters({ search, muscle_group: muscleGroup, filter_type: value });
  };

  const applyFilters = (filters: { search: string; muscle_group: string; filter_type: string }) => {
    const apiFilters: any = {
      search: filters.search,
      muscle_group: filters.muscle_group,
    };

    // Convertir filter_type a is_global
    if (filters.filter_type === 'global') {
      apiFilters.is_global = true;
    } else if (filters.filter_type === 'custom') {
      apiFilters.is_global = false;
    }

    onFilterChange(apiFilters);
  };

  const clearFilters = () => {
    setSearch('');
    setMuscleGroup('');
    setFilterType('');
    onFilterChange({ search: '', muscle_group: '' });
  };

  const hasActiveFilters = search || muscleGroup || filterType;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            id="search"
            type="text"
            placeholder="Nombre del ejercicio..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Grupo muscular */}
        <div>
          <label htmlFor="muscle-group" className="block text-sm font-medium text-gray-700 mb-1">
            Grupo Muscular
          </label>
          <select
            id="muscle-group"
            value={muscleGroup}
            onChange={(e) => handleMuscleGroupChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            {MUSCLE_GROUPS.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            id="filter-type"
            value={filterType}
            onChange={(e) => handleFilterTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="global">Globales</option>
            <option value="custom">Personalizados</option>
          </select>
        </div>

        {/* Botón limpiar */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}