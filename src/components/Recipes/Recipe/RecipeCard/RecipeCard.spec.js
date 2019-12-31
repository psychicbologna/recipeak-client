import React from 'react';
import ReactDOM from 'react-dom'
import RecipeCard from './RecipeCard';
import { MemoryRouter } from 'react-router-dom';

describe('RecipeCard component testing', () => {

  it('renders without crashing', async () => {
    const recipe = {
      prep_time_hours: 0,
      prep_time_minutes: 0,
      date_created: '',
      date_updated: ''
    }

    const div = document.createElement('div');

    await ReactDOM.render(<MemoryRouter><RecipeCard recipe={recipe} /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});