import React from 'react';
import ReactDOM from 'react-dom'
import SignupForm from './SignupForm';
import { MemoryRouter } from 'react-router-dom';

describe('SignupForm component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><SignupForm /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});