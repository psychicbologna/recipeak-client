import React, { Component } from 'react';
import RecipeListContext from '../../contexts/RecipeCardListContext';
// import RecipeCard from './Recipe/RecipeCard';
import RecipeApiService from '../../services/recipes-api-service';
import { Section } from '../../components/Utils/Utils';
import RecipeCard from './Recipe/RecipeCard';

export default class RecipeCardList extends Component {

  static contextType = RecipeListContext;

  componentDidMount() {
    this.context.clearError()
    RecipeApiService.getUserRecipes()
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }

  renderRecipes() {
    const { recipeList = [] } = this.context;
    return recipeList.map(recipe => 
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        />
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