import React from 'react';
import ReactDOM from 'react-dom'
import Ingredient from './Ingredient';
import { MemoryRouter } from 'react-router-dom';

describe('Ingredient component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><Ingredient /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});