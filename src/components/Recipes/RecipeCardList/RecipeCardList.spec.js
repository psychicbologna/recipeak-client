import React from 'react';
import ReactDOM from 'react-dom'
import RecipeCardList from './RecipeCardList';
import { MemoryRouter } from 'react-router-dom';

describe('RecipeCardList component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><RecipeCardList /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});