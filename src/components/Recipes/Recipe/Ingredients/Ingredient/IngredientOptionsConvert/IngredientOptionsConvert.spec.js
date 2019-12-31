import React from 'react';
import ReactDOM from 'react-dom'
import IngredientOptionsConvert from './IngredientOptionsConvert';
import { MemoryRouter } from 'react-router-dom';

describe('IngredientOptionsConvert component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><IngredientOptionsConvert /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});