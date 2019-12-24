import React, { Component } from 'react';
import { Button } from '../../../../Utils/Utils'
export default class IngredientOptionsConvert extends Component {

  render() {
    const {editingIngredient, ingredient, onDeleteIngredient, onEditIngredient} = this.props

    return (
      <div className="Ingredient__Options IngredientOptionsBase">
        <Button
          className="Ingredient__Options__button delete"
          type='button'
          onClick={event => onDeleteIngredient(event, ingredient.id)}
          disabled={!!editingIngredient}
        >
          Delete
          </Button>
        <Button
          className="Ingredient__Options__button edit"
          type='button'
          onClick={event => onEditIngredient(event, ingredient.id)}
          disabled={!!editingIngredient}
        >
          Edit
          </Button>
      </div>
    )
  }
}