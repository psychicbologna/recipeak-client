import React, { Component } from 'react';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';
import Ingredient from './Ingredient/Ingredient';

//TODO conversion button in ingredients options sets all to one class or another.
//TODO editing one ingredient removes the option to edit others; showeedit enough?

export default class IngredientList extends Component {

  static defaultProps = {
    ingredients: [],
    showIngredientOptions: false,
    allowIngredientEdits: true
  }

  static contextType = RecipeFormContext;

  state = {
    showOptions: this.props.showIngredientOptions,
    editingId: ''
  }

  handleSetEditingId = ingredientId => {
    this.setState({ editingId: ingredientId })
  }

  handleClearEditingId = () => {
    console.log('firing')
    this.setState({ editingId: '' })
  }

  toggleShowOptions = event => {
    event.preventDefault();
    this.setState({ showOptions: this.state.showOptions })
  }

  handleEditIngredientSubmit = () => {
    this.context.clearCurrentIngredient();
    this.toggleShowOptions();
    this.clearEditingId();
  }

  render() {
    const { ingredients, allowIngredientEdits } = this.props
    const { showOptions, editingId } = this.state

    return (
      !ingredients.length
        ? <section className="RecipeForm__ingredients-preview">
          <h4>A recipe is nothing without ingredients!</h4>
          <p>Enter an ingredient on the add form below to get started. Recipes must be submitted with at least one ingredient.</p>
          <p>NOTE: Changes made to this list won't save until the entire recipe is submitted.</p>
        </section>

        : <section className="RecipeForm__ingredients-preview">
          <h3>Ingredients</h3>
          <ul className='RecipeForm__ingredients-list'>
            {ingredients.map(ingredient => {
              return (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient.id}
                  showOptions={showOptions}
                  editingId={editingId}
                  allowIngredientEdits={allowIngredientEdits}
                  onSetEditingId={this.handleSetEditingId}
                  onClearEditingId={this.handleClearEditingId}
                />
              );
            })}
          </ul>
        </section>
    )
  }
}