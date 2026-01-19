/**
 * App principal con routing.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/hooks/useAuth';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { LoginForm } from './features/auth/components/LoginForm';
import { RegisterForm } from './features/auth/components/RegisterForm';
import { Layout } from './shared/components/Layout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { ExercisesPage } from './features/exercises/pages/ExercisesPage';
import { RoutinesPage } from './features/routines/pages/RoutinesPage';
import { RoutineDetailPage } from './features/routines/pages/RoutineDetailPage';
import { WorkoutsPage } from './features/workouts/pages/WorkoutsPage';
import { WorkoutLoggerPage } from './features/workouts/pages/WorkoutLoggerPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercises"
            element={
              <ProtectedRoute>
                <Layout>
                  <ExercisesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/routines"
            element={
              <ProtectedRoute>
                <Layout>
                  <RoutinesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/routines/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <RoutineDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workouts"
            element={
              <ProtectedRoute>
                <Layout>
                  <WorkoutsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workouts/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <WorkoutLoggerPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;