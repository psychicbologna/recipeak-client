import React from 'react';
import ReactDOM from 'react-dom'
import NotFound from './NotFound'
import { MemoryRouter } from 'react-router-dom';

describe('NotFound component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><NotFound /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});