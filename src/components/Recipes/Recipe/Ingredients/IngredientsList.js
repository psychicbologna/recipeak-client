import React, { Component } from 'react';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';
import Ingredient from './Ingredient/Ingredient';

//TODO conversion button in ingredients options sets all to one class or another.
//TODO editing one ingredient removes the option to edit others; showeedit enough?

export default class IngredientList extends Component {

  static defaultProps = {
    ingredients: [],
    showIngredientOptions: false
  }

  static contextType = RecipeFormContext;

  state = {
    showOptions: this.props.showIngredientOptions,
    editingIngredient: ''
  }

  handleSetEditingIngredient = ingredient => {
    this.setState({ editingIngredient: ingredient.id })
  }

  clearEditingIngredient = () => {
    this.setState({ editingIngredient: '' })
  }

  toggleShowOptions = event => {
    event.preventDefault();
    this.setState({ showOptions: this.state.showOptions })
  }

  // handleEditIngredientClick = ingredient => {
  //   this.context.setCurrentIngredient(ingredient);
  //   this.toggleShowOptions();
  //   this.setEditingIngredient(ingredient);
  // }

  handleEditIngredientCancel = () => {
    this.context.clearCurrentIngredient();
    this.toggleShowOptions();
    this.clearEditingIngredient();
  }

  render() {
    const { ingredients } = this.props
    const { showOptions, editingIngredient } = this.state

    return (
      !ingredients.length
        ? <section className="RecipeForm__ingredients-preview">
          <h4>A recipe is nothing without ingredients!</h4>
          <p>Enter an ingredient on the add form below to get started. Recipes must be submitted with at least one ingredient.</p>
          <p>NOTE: Changes made to this list won't save until the entire recipe is submitted.</p>
        </section>

        : <section className="RecipeForm__ingredients-preview">
          <h3>Ingredients</h3>
          {showOptions && <IngredientListOptions />}
          <ul className='RecipeForm__ingredients-list'>
            {ingredients.map(ingredient => {
              return (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient.id}
                  showOptions={showOptions}
                  editingIngredient={editingIngredient}
                  onSetEditingIngredient={this.handleSetEditingIngredient}
                />
              );
            })}
          </ul>
          {showOptions && <IngredientListOptions />}
        </section>
    )
  }
}

function IngredientListOptions(props) {
  return (
    <div className="IngredientList__options">
      <p>Add Ingredient</p>
    </div>
  )
}