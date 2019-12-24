import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitSelect from './UnitSelect';
import { Input, Button } from '../../../Utils/Utils'

export default class IngredientFieldset extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    ingredient: nullIngredient,
    editing: false,
    disabled: false
  }

  // componentDidMount() {
  //   if (this.props.ingredient.id !== null) {

  //   }
  // }

  render() {
    const { currentIngredient, updateIngredientField, disableFieldsets } = this.context;
    const { editing, handleSubmit, onCancelClick } = this.props;

    //TODO button context based on edit/add
    //TODO toggle ingredient options (currently just set to 'true')
    return (
      <fieldset
        className='Fieldset RecipeForm__Ingredient'
        disabled={disableFieldsets}
      >
        <legend>{editing ? `Editing: ${currentIngredient.ing_text.value}` : 'Add Ingredient'}</legend>
        <Input
          defaultValue={currentIngredient.amount.value}
          updateField={updateIngredientField}
          inputId='amount'
          inputLabel='Amount'
          inputType='number'
          parentForm='RecipeForm'
        />
        <UnitSelect />
        <Input
          defaultValue={currentIngredient.ing_text.value}
          updateField={updateIngredientField}
          inputId='ing_text'
          inputLabel='Ingredient'
          inputType='text'
          parentForm='RecipeForm'
        />
        <div className="Ingredient__Options">
          <Button classname="Ingredient__Options__button" onClick={event => handleSubmit(event, currentIngredient)}>
            Submit
            </Button>
          {editing
            ? <Button classname="Ingredient__Options__button" onClick={() => onCancelClick()}>
              Cancel
          </Button>
            : null
          }
        </div>
      </fieldset>
    )
  };
};