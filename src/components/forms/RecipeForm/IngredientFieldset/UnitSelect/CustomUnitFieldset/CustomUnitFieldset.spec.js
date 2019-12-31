import React from 'react';
import ReactDOM from 'react-dom'
import CustomUnitFieldset from './CustomUnitFieldset';
import { MemoryRouter } from 'react-router-dom';

describe('CustomUnitFieldset component testing', () => {

  it('renders without crashing', async () => {

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><CustomUnitFieldset /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});