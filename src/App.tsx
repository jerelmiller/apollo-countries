import './App.scss';
import Countries from './components/Countries';
import Logo from './components/Logo';

const App = () => {
  return (
    <main className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <h1>Jerel's GraphQL Countries</h1>
      </header>
      <Countries />
    </main>
  );
};

export default App;
