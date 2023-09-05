import React, { Suspense } from 'react';
import { useAuth } from './auth';
import { LoadingOverlay } from '@mantine/core';

export function App() {
  const { token } = useAuth();
  const Portal = React.lazy(() => import('./Portal'));
  const LandingPage = React.lazy(() => import('./LandingPage'));
  const Content = token ? Portal : LandingPage;

  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      <Content />
    </Suspense>
  );
}

export default App;
