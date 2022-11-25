import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigator from './components/Navigator';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './providers/AuthProvider';
const DerivedFromProps = lazy(() =>
  import(/* webpackChunkName: 'form' */ './pages/DerivedFromProps')
);
const Home = lazy(() => import(/* webpackChunkName: 'home' */ './pages/Home'));
const ReactMemo = lazy(() =>
  import(/* webpackChunkName: 'react-memo' */ './pages/ReactMemo')
);
const UseCallback = lazy(() =>
  import(/* webpackChunkName: 'use-callback' */ './pages/UseCallback')
);
const UseMemo = lazy(() =>
  import(/* webpackChunkName: 'use-memo' */ './pages/UseMemo')
);
const PaginatedList = lazy(() =>
  import(/* webpackChunkName: 'paginated-list' */ './pages/PaginatedList')
);
const ConditionalHooks = lazy(() =>
  import(/* webpackChunkName: 'conditional-hooks' */ './pages/ConditionalHooks')
);
function App() {
  return (
    <AuthProvider>
      <h1>React CLI</h1>
      <Navigator />
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/paginated-list" element={<PaginatedList />} />
          <Route path="/conditional-hooks" element={<ConditionalHooks />} />
          <Route
            path="/derive-state-props"
            element={
              <ProtectedRoute>
                <DerivedFromProps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/react-memo"
            element={
              <ProtectedRoute>
                <ReactMemo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usecallback-hook"
            element={
              <ProtectedRoute>
                <UseCallback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usememo-hook"
            element={
              <ProtectedRoute>
                <UseMemo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
