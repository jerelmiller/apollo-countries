import './App.scss';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Countries from './components/Countries';
import Logo from './components/Logo';
import PageSpinner from './components/PageSpinner';
import Error from './components/Error';

const App = () => {
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
            <Countries />
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
