import React, { Component } from 'react';
import RecipeListContext from '../../contexts/RecipeCardListContext';
// import RecipeCard from './Recipe/RecipeCard';
import RecipeApiService from '../../services/recipes-api-service';
import { Section } from '../../components/Utils/Utils';
import RecipeCard from './Recipe/RecipeCard';
import TokenService from '../../services/token-service';

export default class RecipeCardList extends Component {

  static contextType = RecipeListContext;

  componentDidMount() {
    this.context.clearError()
    //TODO separate into UserApiService
    RecipeApiService.getUserData()
      .then(userData => {
        return TokenService.setSessionUserData(userData)
      })
      .catch(this.context.setError)
    RecipeApiService.getUserData()
      .then(userData => {
        console.dir(this.context);
        const recipeList = userData.recipes;
        return this.context.setRecipeList(recipeList)
      })
  }

  renderRecipes() {
    const { recipeList = [] } = this.context;
    if (recipeList === []) {
      return(<p>No recipes found! Try adding a recipe.</p>)
    } else {
    return recipeList.map(recipe => 
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        />
      )
    }
  }

  render() {
    const { error } = this.context;
    return (
      <Section list className='RecipeCardList'>
        {error
          ? <p> Error loading the recipes. </p>
          : this.renderRecipes()
          }
      </Section>
    )
  }
}