import React from 'react';
import ReactDOM from 'react-dom'
import PrimaryNav from './PrimaryNav';
import { MemoryRouter } from 'react-router-dom';

describe('PrimaryNav component testing', () => {

  it('renders without crashing', async () => {
    const currentIngredient = {
      unit_set: { value: 'none' }
    }
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><PrimaryNav currentIngredient={currentIngredient} /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});