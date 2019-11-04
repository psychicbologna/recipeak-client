import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default class RecipeCard extends Component {

  render() {
    const { recipe } = this.props
    const { date_created, date_updated } = recipe;
    return (
      <section className='RecipeCard'>
        <header className='RecipeCard__header'>
          <Link to={`/recipes/${recipe.id}`} className='RecipeCard__recipelink'>
            <h3 className='RecipeCard__heading'>{recipe.name}</h3>
          </Link >
          <h4>by {recipe.author}</h4>
        </header>
        <p>Prep Time: {recipe.prep_time}</p>
        <RecipeDate prepend='Created' date={date_created} />
        <RecipeDate prepend='Last Updated' date={date_updated} />
        {/* <p>Category: Recipe Category</p>
        <p>Rating: Recipe Rating</p> */}
        <RecipeCardFooter recipe={recipe} />
      </section>

    )
  };
};

function ViewLink(props) {
  const { recipeId } = props;
  return (
    <Link to={`/recipes/${recipeId}`} className='RecipeCard__ViewLink'>View</Link >
  )
}

function DeleteLink(props) {
  //TODO handle delete function
  const { recipeId, recipeName, onDeleteClick } = props;
  return (
    <a onClick={onDeleteClick} className='RecipeCard__DeleteLink'>Delete</a>
  )
}

function EditLink(props) {
  const { recipeId } = props;
  return (
    <Link to={`/recipes/${recipeId}/edit`} className='RecipeCard__EditLink'>Edit</Link>
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