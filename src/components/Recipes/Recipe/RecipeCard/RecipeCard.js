import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PrepTimeDisplay, Button } from '../../../Utils/Utils';
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
          <h4>by {recipe.author}</h4>
        </header>
        <h4>Prep Time:</h4>
        <PrepTimeDisplay hours={prep_time_hours} minutes={prep_time_minutes} />
        <RecipeDate prepend='Created' date={date_created} />
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

function DeleteLink(props) {
  //TODO handle delete function
  const { onDeleteClick } = props;
  return (
    <Button type='button' onClick={onDeleteClick} className='RecipeCard__DeleteLink'>Delete</Button>
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
        <li>
          <DeleteLink recipeId={recipe.id} />
        </li>
      </ul>
    </footer>
  )
}

function RecipeDate(props) {
  const { prepend, date } = props

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