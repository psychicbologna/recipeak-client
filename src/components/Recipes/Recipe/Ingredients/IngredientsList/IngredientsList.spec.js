import React from 'react';
import ReactDOM from 'react-dom'
import IngredientsList from './IngredientsList';
import { MemoryRouter } from 'react-router-dom';

describe('IngredientsList component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><IngredientsList /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});