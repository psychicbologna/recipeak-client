import React from 'react';
import ReactDOM from 'react-dom'
import PrepTimeFieldset from './PrepTimeFieldset';
import { MemoryRouter } from 'react-router-dom';

describe('PrepTimeFieldset component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><PrepTimeFieldset /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});