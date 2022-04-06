
import React from 'react';
import ReactDOM from 'react-dom'
import IngredientFieldSet from './IngredientFieldSet';
import { MemoryRouter } from 'react-router-dom';

describe('IngredientFieldSet component testing', () => {

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    await ReactDOM.render(
      <MemoryRouter>
        <IngredientFieldSet
          isAdding={true}
          disabled={false}
        />
      </MemoryRouter>
      , div);

    ReactDOM.unmountComponentAtNode(div);
  });
});