import React, { Component } from 'react';
import { NiceDate } from '../../Utils/Utils';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default class RecipeCard extends Component {
  
  RecipeDate(prepend, date) {
    const dateObject = new Date(date);
    const dateContent = `${prepend}: ${dateObject.toLocaleDateString()} at ${dateObject.toLocaleTimeString()}`;

    if (date) {
        return (
      <p className='RecipeCard__date'>{dateContent}</p>
    )
    }
  }

  renderRecipeCardFooter() {
    const { recipe } = this.props

    return (
      <footer className='RecipeCard__footer'>
        {this.RecipeDate('Created', recipe.date_created)}
        {this.RecipeDate('Last Updated', recipe.date_updated)}
      </footer>
    )
  }

  render() {
    const { recipe } = this.props
    return (
      <section className='RecipeCard'>
        <header className='RecipeCard__header'>
          <Link to={`/recipes/${recipe.id}`} className='RecipeCard__recipelink'>
            <h3 className='RecipeCard__heading'>{recipe.name}</h3>
          </Link >
          <h4>by {recipe.author}</h4>
        </header>
        <p>Prep Time: {recipe.prep_time}</p>
        {/* <p>Category: Recipe Category</p>
        <p>Rating: Recipe Rating</p> */}
        {this.renderRecipeCardFooter()}
      </section>

    )
  };
};