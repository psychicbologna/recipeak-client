import React from 'react';
import ReactDOM from 'react-dom'
import DeleteRecipeConfirm from './DeleteRecipeConfirm';
import { MemoryRouter } from 'react-router-dom';

describe('DeleteRecipeConfirm component testing', () => {

  it('renders without crashing', async () => {
  
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><DeleteRecipeConfirm /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});