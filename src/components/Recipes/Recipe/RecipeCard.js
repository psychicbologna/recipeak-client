import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default class RecipeCard extends Component {

  renderRecipeCardFooter() {
    const { recipe } = this.props
    return (
      <footer className='RecipeCard__footer'>
        {!recipe.date_updated ? 'Created: ' + recipe.date_created : 'Last Updated: ' + recipe.date_updated}
      </footer>
    )
  }

  render() {
    const { recipe } = this.props
    return (
      <section className='RecipeCard'>
        <header className='RecipeCard__header'>
          <Link to={`/recipe/${recipe.id}`} className='RecipeCard__recipelink'>
            <h3 className='RecipeCard__heading'>{recipe.name}</h3>
          </Link >
          <h4>by {recipe.author}</h4>
        </header>
        <p>Category: Recipe Category</p>
        <p>Rating: Recipe Rating</p>
        {this.renderRecipeCardFooter()}
      </section>

    )
  };
};