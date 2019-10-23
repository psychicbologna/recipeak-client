import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import RecipeListContext from '../../contexts/RecipeCardListContext';
import RecipeCard from './Recipe/RecipeCard';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class RecipeCardList extends Component {

  static contextType = RecipeListContext;

  renderRecipes() {
    const { recipeList = [] } = this.context;
    console.log(this.context);
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