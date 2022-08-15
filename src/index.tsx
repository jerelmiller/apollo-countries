import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import GraphQLClientProvider from './components/GraphQLClientProvider';
import createGraphQLClient from './createGraphQLClient';
import reportWebVitals from './reportWebVitals';

const client = createGraphQLClient({
  url: 'https://countries.trevorblades.com',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GraphQLClientProvider client={client}>
      <App />
    </GraphQLClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
