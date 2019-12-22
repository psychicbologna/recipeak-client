import React, { Component } from 'react';
import Ingredient from './Ingredient/Ingredient';

//TODO conversion button in ingredients options.
//TODO render dummy list?

export default class IngredientList extends Component {

  static defaultProps = {
    ingredients: [],
    showIngredientOptions: false
  }

  state = {
    showOptions: this.props.showIngredientOptions
  }
  // renderDummyList(n) {
  //   for (let i; i <= n; i++) {
  //     return <li className="Ingredient__dummy"></li>
  //   }
  // }

  toggleShowOptions = event => {
    event.preventDefault();
    this.setState({ showOptions: this.state.showOptions })
  }

  render() {
    const { ingredients } = this.props
    const { showOptions } = this.state

    return (
      !ingredients.length
        ? <section className="RecipeForm__ingredients-preview">
          <h4>A recipe is nothing without ingredients!</h4>
          <p>Enter an ingredient on the add form below to get started. Recipes must be submitted with at least one ingredient.</p>
        </section>

        : <section className="RecipeForm__ingredients-preview">
          <h3>Ingredients</h3>
          <IngredientListOptions />
          <ul className='RecipeForm__ingredients-list'>
            {ingredients.map(ingredient => {
              return (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient.id}
                  showOptions={showOptions}
                />
              );
            })}
          </ul>
          <IngredientListOptions />
        </section>
    )
  }
}

function IngredientListOptions(props) {
  return (
    <div className="IngredientList__options">
      <p>Options buttons go here.</p>
    </div>
  )
}