import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import UserHomeContext from '../../contexts/UserHomeContext';
import RecipeCard from './Recipe/RecipeCard';
import {Link} from 'react-router-dom';

export default class RecipeCardList extends Component {

  static contextType = UserHomeContext;

  renderRecipes() {
    const { recipeList = [] } = this.context;
    if (recipeList === []) {
      return(<p>It looks like you have no recipes yet. <Link to='/recipes/add'>Add one.</Link></p>)
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