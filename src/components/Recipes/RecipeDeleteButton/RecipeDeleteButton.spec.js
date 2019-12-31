import React from 'react';
import ReactDOM from 'react-dom'
import RecipeDeleteButton from './RecipeDeleteButton';
import { MemoryRouter } from 'react-router-dom';

describe('RecipeDeleteButton component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><RecipeDeleteButton /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});