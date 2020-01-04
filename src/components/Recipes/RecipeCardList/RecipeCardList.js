import React, { Component } from 'react';
import { Section } from '../../Utils/Utils';
import UserHomeContext from '../../../contexts/UserHomeContext';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Link } from 'react-router-dom';
import './RecipeCardList.css'

export default class RecipeCardList extends Component {

  static contextType = UserHomeContext;

  renderRecipes() {
    const { recipeList = [] } = this.context;
    if (recipeList === []) {
      return (<p>It looks like you have no recipes yet. <Link to='/recipes/add'>Add one.</Link></p>)
    } else {
      return (
        <ul className='RecipeCardList__List'>
          {recipeList.map(recipe =>
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          )}
        </ul>
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