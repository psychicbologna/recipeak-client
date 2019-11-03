import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default class RecipeCard extends Component {

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
        <RecipeCardFooter recipe={recipe} />
      </section>

    )
  };
};

function RecipeCardFooter(props) {
  const { recipe } = props
  const { date_created, date_updated } = recipe;

  return (
    <footer className='RecipeCard__footer'>
      <RecipeDate prepend='Created' date={date_created}/>
      <RecipeDate prepend='Last Updated' date={date_updated}/>
    </footer>
  )
}

function RecipeDate(props) {
  const {prepend, date} = props

  const dateObject = new Date(date);
  const dateContent = `${prepend}: ${dateObject.toLocaleDateString()} at ${dateObject.toLocaleTimeString()}`;

  if (date) {
      return (
    <p className='RecipeCard__date'>{dateContent}</p>
  )
  } else {
    return null;
  }
}