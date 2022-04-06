
import React from 'react';
import ReactDOM from 'react-dom'
import RecipeEditPage from './RecipeEditPage'
import { MemoryRouter } from 'react-router-dom';

describe('RecipeEditPage component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><RecipeEditPage /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});