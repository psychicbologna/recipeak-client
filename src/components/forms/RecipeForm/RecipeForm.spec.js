import React from 'react';
import ReactDOM from 'react-dom'
import RecipeForm from './RecipeForm';
import { MemoryRouter } from 'react-router-dom';

describe('RecipeForm component testing', () => {

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><RecipeForm /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});