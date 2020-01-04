import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PrepTimeDisplay, Button } from '../../Utils/Utils';
import './RecipeCard.css';


export default class RecipeCard extends Component {

  render() {
    const { recipe } = this.props
    const { prep_time_hours, prep_time_minutes, date_created } = recipe;
    return (
      <section className='RecipeCard'>
        <header className='RecipeCard__header'>
          <Link to={`/recipes/${recipe.id}`} className='RecipeCard__recipelink'>
            <h3 className='RecipeCard__heading'>{recipe.name}</h3>
          </Link >
          <h4 className='RecipeCard__subheading'>by {recipe.author}</h4>
        </header>
        <PrepTimeDisplay className="RecipeCard__line" prepend='Prep Time: ' hours={prep_time_hours} minutes={prep_time_minutes} />
        <RecipeDate className="RecipeCard__line" prepend='Created: ' date={date_created} />
        <RecipeCardFooter recipe={recipe} />
      </section>

    )
  };
};

function ViewLink(props) {
  const { recipeId } = props;
  return (
    <Link to={`/recipes/${recipeId}`} className='RecipeCard__ViewLink Button'>View</Link >
  )
}

function EditLink(props) {
  const { recipeId } = props;
  return (
    <Link to={`/recipes/${recipeId}/edit`} className='RecipeCard__EditLink Button'>Edit</Link>
  )
}

function RecipeCardFooter(props) {
  const { recipe } = props;

  return (
    <footer className='RecipeCard__footer'>
      <ul className='RecipeCard__footer_menu'>
        <li>
          <ViewLink recipeId={recipe.id} recipeName />
        </li>
        <li>
          <EditLink recipeId={recipe.id} />
        </li>
      </ul>
    </footer>
  )
}

function RecipeDate(props) {
  const { className, prepend, date } = props

  const dateObject = new Date(date);
  const dateContent = `${prepend}${dateObject.toLocaleDateString()} at ${dateObject.toLocaleTimeString()}`;

  if (date) {
    return (
      <p className={className}>{dateContent}</p>
    )
  } else {
    return null;
  }
}