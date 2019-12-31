import React from 'react';
import ReactDOM from 'react-dom'
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><Header /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});