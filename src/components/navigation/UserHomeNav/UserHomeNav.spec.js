import React from 'react';
import ReactDOM from 'react-dom'
import UserHomeNav from './UserHomeNav';
import { MemoryRouter } from 'react-router-dom';

describe('UserHomeNav component testing', () => {

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><UserHomeNav /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});