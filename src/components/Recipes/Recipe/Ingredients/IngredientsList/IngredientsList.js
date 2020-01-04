import React, { Component } from 'react';
import RecipeFormContext from '../../../../../contexts/RecipeFormContext';
import Ingredient from '../Ingredient/Ingredient';

// Lists the set of ingredients for the recipe. It loads changes to ingredients when they are made, and
// also prevents changes when necessary by isolating or disabling options on ingredients.
export default class IngredientList extends Component {

  static defaultProps = {
    ingredients: [],
    showIngredientOptions: false,
  }

  static contextType = RecipeFormContext;

  state = {
    showOptions: this.props.showIngredientOptions,
    editingId: ''
  }

  //If set, disables editing on other ingredients. This prevents potential loss of data in inputs and ensures tidier user interaction.
  handleSetEditingId = ingredientId => {
    this.setState({ editingId: ingredientId })
  }

  //Clears a set editing id, allowing you to edit other forms again.
  handleClearEditingId = () => {
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
    const { ingredients, className } = this.props
    const { showOptions, editingId } = this.state

    return (
      !ingredients.length
        ? <section className={`${className}__ingredients-preview`}>
          <h4>A recipe is nothing without ingredients!</h4>
          <p>Enter an ingredient on the add form below to get started. Recipes must be submitted with at least one ingredient.</p>
          <p>NOTE: Changes made to this list won't save until the entire recipe is submitted.</p>
        </section>

        : <section className={`${className}__ingredients`}>
          <h3 className={`${className}__ingredients-title`}>Ingredients</h3>
          <ul className={`${className}__ingredients-list`}>
            {ingredients.map(ingredient => {
              return (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient.id}
                  showOptions={showOptions}
                  editingId={editingId}
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