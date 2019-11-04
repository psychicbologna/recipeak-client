import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './_normalize.css';
import './_variables.css';
import './assets/fonts/abel-regular-webfont.woff';
import './assets/fonts/2-questa_grande_regular_31-webfont.woff';
import './assets/fonts/2-questa_grande_regular_31-webfont.woff2';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { RecipeListProvider } from './contexts/RecipeCardListContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { RecipesFormContextProvider } from './contexts/RecipesFormContext'

ReactDOM.render(
  <BrowserRouter>
    <RecipeListProvider>
      <RecipeProvider>
        <RecipesFormContextProvider>
          <App />
        </RecipesFormContextProvider>
      </RecipeProvider>
    </RecipeListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
