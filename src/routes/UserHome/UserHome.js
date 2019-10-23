import React, { Component } from 'react';
import UserHomeNav from '../../components/navigation/UserHomeNav/UserHomeNav';
import RecipeApiService from '../../services/recipes-api-service';
import RecipeListContext from '../../contexts/RecipeCardListContext';
import RecipeCardList from '../../components/Recipes/RecipeCardList';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';

export default class UserHome extends Component {

  static contextType = RecipeListContext;

  componentDidMount() {
    this.context.clearError()
    //TODO separate into UserApiService
    RecipeApiService.getUserData()
      .then(userData => {
        console.dir(userData);
        return TokenService.setSessionUserData(userData)
      })
      .catch(this.context.setError)
    RecipeApiService.getUserData()
      .then(userData => {
        const recipeList = userData.recipes;
        return this.context.setRecipeList(recipeList)
      })
      .catch(this.context.setError);
  }

  render() {
    let userData;
    const { recipes } = this.context.recipeList;

    if (TokenService.hasSessionUserdata()) {
      userData = TokenService.getSessionUserdata()
    };

    if (userData) {
      return (
        <section className='UserHome'>
          <h2>{formatName(userData.first_name)} Recipes</h2>
          <UserHomeNav username />
          {
            !this.context.recipeList.length
              ? <p>Loading your recipes...</p>
              : <RecipeCardList listCheck={this.context.recipeList.length} />
          }
        </section>
      )
    } else {
      return (
        <p>Unable to retrieve user data.</p>
      )
    }
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