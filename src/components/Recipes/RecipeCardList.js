import React, { Component } from 'react';
import RecipeListContext from '../../contexts/RecipeCardListContext';
// import RecipeCard from './Recipe/RecipeCard';
import RecipeApiService from '../../services/recipes-api-service';
import { Section } from '../../components/Utils/Utils';

export default class RecipeCardList extends Component {

  static contextType = RecipeListContext;

  componentDidMount() {
    this.context.clearError()
    RecipeApiService.getRecipes()
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }

  renderRecipes() {
    const { recipeList = [] } = this.context;
    return recipeList.map(recipe => 
      <div>
        <h2>I'm a recipe card for {recipe.name}!</h2>
        <p></p>
      </div>
      )
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