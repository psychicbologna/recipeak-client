import React from 'react';
import ReactDOM from 'react-dom'
import IngredientOptionsBase from './IngredientOptionsBase';
import { MemoryRouter } from 'react-router-dom';

describe('IngredientOptionsBase component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><IngredientOptionsBase /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});