import React from 'react';
import ReactDOM from 'react-dom'
import UnitSelect from './UnitSelect';
import { MemoryRouter } from 'react-router-dom';

describe('UnitSelect component testing', () => {

  it('renders without crashing', async () => {
    const currentIngredient = {
      unit_set: { value: 'none' }
    }
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><UnitSelect currentIngredient={currentIngredient} /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});