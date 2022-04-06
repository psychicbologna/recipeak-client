import React from 'react';
import ReactDOM from 'react-dom'
import Input from './Input';
import { MemoryRouter } from 'react-router-dom';

describe('Input component testing', () => {

  it('renders without crashing', async () => {
    const currentIngredient = {
      unit_set: { value: 'none' }
    }
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><Input currentIngredient={currentIngredient} /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});