import React from 'react';
import ReactDOM from 'react-dom'
import RecipeAddPage from './RecipeAddPage'
import { MemoryRouter } from 'react-router-dom';

describe('RecipeAddPage component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><RecipeAddPage /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});