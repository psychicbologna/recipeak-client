import React from 'react';
import ReactDOM from 'react-dom'
import SignupPage from './SignupPage'
import { MemoryRouter } from 'react-router-dom';

describe('SignupPage component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><SignupPage /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});