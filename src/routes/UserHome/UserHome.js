import React, { Component } from 'react';
import UserHomeNav from '../../components/navigation/UserHomeNav/UserHomeNav'
import RecipeCardList from '../../components/Recipes/RecipeCardList';

export default class UserHome extends Component {
  render() {    
    return (
      <section className='UserHome'>
        <h2>[Name]'s Recipes</h2>
        <UserHomeNav />
        <RecipeCardList />
      </section>
    )
  }
}