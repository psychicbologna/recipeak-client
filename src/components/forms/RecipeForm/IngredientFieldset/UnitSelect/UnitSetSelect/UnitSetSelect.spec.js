
import React from 'react';
import ReactDOM from 'react-dom'
import UnitSetSelect from './UnitSetSelect';
import { MemoryRouter } from 'react-router-dom';

describe('UnitSetSelect component testing', () => {

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><UnitSetSelect /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});