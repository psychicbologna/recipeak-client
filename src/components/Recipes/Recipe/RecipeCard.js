import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default class RecipeCard extends Component {
  render() {
    const { recipe } = this.props
    return (
      <section className='RecipeCard'>
          <header className='RecipeCard__header'>
          <Link to={`/recipe/${recipe.id}`} className='RecipeCard__recipelink'>
          <h3 className='RecipeCard__heading'>{recipe.name}</h3>
          </Link >
          <p>Category: Recipe Category</p>
          <p>Rating: Recipe Rating</p>
        </header>
      </section>
      
    )
  };
};