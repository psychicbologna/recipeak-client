import React from 'react';
import ReactDOM from 'react-dom'
import LandingPage from './LandingPage'
import { MemoryRouter } from 'react-router-dom';

describe('LandingPage component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><LandingPage /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});