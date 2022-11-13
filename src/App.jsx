import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigator from './components/Navigator';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './providers/AuthProvider';
const DerivedFromProps = lazy(() =>
  import(/* webpackChunkName: 'form' */ './pages/DerivedFromProps')
);
const Home = lazy(() => import(/* webpackChunkName: 'home' */ './pages/Home'));
function App() {
  return (
    <AuthProvider>
      <h1>React CLI</h1>
      <Navigator />
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/derived-from-props"
            element={
              <ProtectedRoute>
                <DerivedFromProps />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
