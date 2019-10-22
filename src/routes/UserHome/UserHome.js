import React, { Component } from 'react';
import UserHomeNav from '../../components/navigation/UserHomeNav/UserHomeNav'
import RecipeCardList from '../../components/Recipes/RecipeCardList';
import TokenService from '../../services/token-service';

//TODO 'Your' to ':Name'
export default class UserHome extends Component {
  static defaultProps = {}

  render() {
    const userData = TokenService.getSessionUserdata()
    return (
      <section className='UserHome'>
        <h2>{formatName(userData.first_name)} Recipes</h2>
        <UserHomeNav username={userData.username} />
        <RecipeCardList username={userData.username} />
      </section>
    )
  }
}

//TODO put me in utils!
function formatName(firstName) {
  if (!firstName.endsWith('s')) {
    return `${firstName}'s`
  } else {
    return `${firstName}'`
  }
}