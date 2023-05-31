import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import Error from '../components/Error';
import Logo from '../components/Logo';
import PageSpinner from '../components/PageSpinner';
import './root.scss';

export const RouteComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <h1>Jerel's GraphQL Countries</h1>
      </header>
      <main className="App-main">
        <Suspense fallback={<PageSpinner />}>
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <Error title="Something went wrong" message={error.message} />
            )}
          >
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
};
