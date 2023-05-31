import './App.scss';
import { Suspense } from 'react';
import Countries from './components/Countries';
import Logo from './components/Logo';
import PageSpinner from './components/PageSpinner';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <h1>Jerel's GraphQL Countries</h1>
      </header>
      <main className="App-main">
        <Suspense fallback={<PageSpinner />}>
          <Countries />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
