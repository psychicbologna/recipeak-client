import React from 'react';
import ReactDOM from 'react-dom'
import RecipePage from './RecipePage'
import { MemoryRouter } from 'react-router-dom';

describe('RecipePage component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><RecipePage /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});