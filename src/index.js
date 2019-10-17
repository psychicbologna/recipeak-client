import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './normalize.css';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { RecipeListProvider } from './contexts/RecipeCardListContext';
import { RecipeProvider } from './contexts/RecipeContext';

ReactDOM.render(
  <BrowserRouter>
    <RecipeListProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </RecipeListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
