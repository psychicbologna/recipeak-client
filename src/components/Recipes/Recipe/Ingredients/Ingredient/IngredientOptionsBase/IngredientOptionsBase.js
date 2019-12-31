import React, { Component } from 'react';
import { Button } from '../../../../../Utils/Utils'

//The base options menu for an ingredient. Includes delete and edit buttons.
export default class IngredientOptionsConvert extends Component {

  render() {
    const {disabled, editingIngredient, onDeleteIngredient, onEditIngredient} = this.props

    return (
      <div className="Ingredient__Options IngredientOptionsBase">
        <Button
          className="Ingredient__Options__button delete"
          type='button'
          onClick={event => onDeleteIngredient(event)}
          disabled={!!editingIngredient || disabled}
        >
          Delete
          </Button>
        <Button
          className="Ingredient__Options__button edit"
          type='button'
          onClick={event => onEditIngredient(event)}
          disabled={!!editingIngredient || disabled}
        >
          Edit
          </Button>
      </div>
    )
  }
}