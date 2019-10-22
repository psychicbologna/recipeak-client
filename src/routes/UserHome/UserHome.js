import React, { Component } from 'react';
import UserHomeNav from '../../components/navigation/UserHomeNav/UserHomeNav'
import RecipeCardList from '../../components/Recipes/RecipeCardList';
import TokenService from '../../services/token-service';

//TODO 'Your' to ':Name'
export default class UserHome extends Component {
  render() {
    return (
      <section className='UserHome'>
        <h2>Your Recipes</h2>
        <UserHomeNav />
        <RecipeCardList />
      </section>
    )
  }
}