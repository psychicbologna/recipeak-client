import React from 'react';
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';

describe('LoginForm component testing', () => {

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><LoginForm /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});