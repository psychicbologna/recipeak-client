
import React from 'react';
import ReactDOM from 'react-dom'
import BasicInfoFieldset from './BasicInfoFieldset';
import { MemoryRouter } from 'react-router-dom';

describe('BasicInfoFieldset component testing', () => {

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><BasicInfoFieldset /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});