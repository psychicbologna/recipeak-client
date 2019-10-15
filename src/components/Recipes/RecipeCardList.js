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
      .then(recipeList => {
        this.context.setRecipeList(recipeList)
      })
      .catch(error => this.context.setError(error))
  }

  renderRecipes() {
    const { recipeList = [] } = this.context;
    return recipeList.map(recipe =>
      <div>
        <h2>I'm a recipe card!</h2>
        <p>{recipe}</p>
      </div>)
  }

  render() {
    const { error } = this.context;
    return (
      <Section list className='recipes-list'>
        {error
          ? <p> Error loading the recipes. </p>
          : this.renderRecipes()}
      </Section>
    )
  }
}