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
import { UserHomeProvider } from './contexts/UserHomeContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { RecipeFormContextProvider } from './contexts/RecipeFormContext'
import { UnitContextProvider } from './contexts/UnitContext';

ReactDOM.render(
  <BrowserRouter>
    <UserHomeProvider>
      <RecipeProvider>
        <RecipeFormContextProvider>
          <UnitContextProvider>
          <App />
          </UnitContextProvider>
        </RecipeFormContextProvider>
      </RecipeProvider>
    </UserHomeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
