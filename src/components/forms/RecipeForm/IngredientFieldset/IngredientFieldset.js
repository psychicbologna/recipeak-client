import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitSelect from './UnitSelect';
import { IngredientEditUnitOutput, Input, Button } from '../../../Utils/Utils';

export default class IngredientFieldset extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    ingredient: nullIngredient,
    editing: false,
    disabled: false
  }

  state = {
    currentIngredient: this.context.currentIngredient,
    unit_single: this.context.currentIngredient.unit_single,
    unit_plural: this.context.currentIngredient.unit_plural
  }

  render() {
    const { currentIngredient, updateIngredientField, disableFieldsets } = this.context;
    const { editing, method, handleSubmit, onCancelClick } = this.props;
    const title = editing ? `Editing Ingredient` : 'Add Ingredient'

    console.log(currentIngredient.unit_plural, currentIngredient.unit_single)

    return (
      <>
        <output className='Ingredient__display'>
          {`${IngredientEditUnitOutput(currentIngredient.amount.value, currentIngredient.unit_plural, currentIngredient.unit_single)} ${currentIngredient.ing_text.value}`}
        </output>
        <fieldset
          className='Fieldset Fieldset__Ingredient'
          disabled={disableFieldsets && method === 'add'}
        >
          <legend>{title}</legend>
          <div className='Fieldset__input-row-fix'>
            <Input
              defaultValue={currentIngredient.amount.value}
              updateField={updateIngredientField}
              inputId='amount'
              inputLabel='Amount'
              inputType='number'
              parentForm='RecipeForm'
            />
            <UnitSelect />
          </div>
          <Input
            defaultValue={currentIngredient.ing_text.value}
            updateField={updateIngredientField}
            inputId='ing_text'
            inputLabel='Ingredient'
            inputType='text'
            parentForm='RecipeForm'
          />
          <div className="Ingredient__Options">
            <Button className="Ingredient__Options__button" onClick={event => handleSubmit(event, currentIngredient)}>
              Submit
            </Button>
            {editing
              ? <Button className="Ingredient__Options__button" onClick={() => onCancelClick()}>
                Cancel
          </Button>
              : null
            }
          </div>
        </fieldset>
      </>
    )
  };
};