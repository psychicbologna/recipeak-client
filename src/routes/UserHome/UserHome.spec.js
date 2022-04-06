import React from 'react';
import ReactDOM from 'react-dom'
import UserHome from './UserHome'
import { MemoryRouter } from 'react-router-dom';

describe('UserHome component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><UserHome /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});