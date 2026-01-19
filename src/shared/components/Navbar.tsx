/**
 * Navbar principal de la aplicación.
 */

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from './ui/Button';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Helper para determinar si un link está activo
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Clases para links activos e inactivos
  const getLinkClasses = (path: string) => {
    if (isActive(path)) {
      return "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-blue-500";
    }
    return "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300";
  };

  const getMobileLinkClasses = (path: string) => {
    if (isActive(path)) {
      return "block pl-3 pr-4 py-2 text-base font-medium text-blue-600 bg-blue-50 border-l-4 border-blue-500";
    }
    return "block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent hover:border-gray-300";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y navegación principal */}
          <div className="flex">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-gray-900 hover:text-blue-600"
            >
              💪 Gym Tracker
            </Link>

            {/* Links de navegación - desktop */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={getLinkClasses('/')}
              >
                Dashboard
              </Link>
              <Link
                to="/exercises"
                className={getLinkClasses('/exercises')}
              >
                Ejercicios
              </Link>
              <Link
                to="/routines"
                className={getLinkClasses('/routines')}
              >
                Rutinas
              </Link>
              <Link
                to="/workouts"
                className={getLinkClasses('/workouts')}
              >
                Entrenamientos
              </Link>
            </div>
          </div>

          {/* User menu - desktop */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
            <span className="text-sm text-gray-700">
              Hola, <span className="font-medium">{user?.username}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Salir
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Abrir menú</span>
              {/* Icon hamburguesa */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={getMobileLinkClasses('/')}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/exercises"
              className={getMobileLinkClasses('/exercises')}
              onClick={() => setIsMenuOpen(false)}
            >
              Ejercicios
            </Link>
            <Link
              to="/routines"
              className={getMobileLinkClasses('/routines')}
              onClick={() => setIsMenuOpen(false)}
            >
              Rutinas
            </Link>
            <Link
              to="/workouts"
              className={getMobileLinkClasses('/workouts')}
              onClick={() => setIsMenuOpen(false)}
            >
              Entrenamientos
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.username}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <Button
                variant="ghost"
                size="md"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}