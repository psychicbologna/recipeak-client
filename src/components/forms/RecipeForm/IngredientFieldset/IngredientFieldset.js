import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitSelect from './UnitSelect';
import { IngredientEditUnitOutput, Input, Button } from '../../../Utils/Utils';

export default class IngredientFieldset extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    ingredient: nullIngredient,
    disabled: false,
    isAdding: false,
    allowIngredientEdits: true
  }

  state = {
    currentIngredient: this.context.currentIngredient,
    newIngredient: nullIngredient,
    unit_single: this.context.currentIngredient.unit_single,
    unit_plural: this.context.currentIngredient.unit_plural
  }

  componentWillUnmount() {
    this.context.clearCurrentIngredient();
  }

  render() {
    const { currentIngredient, updateIngredientField, disableFieldsets } = this.context;
    const { isAdding, allowIngredientEdits, handleSubmit, onCancelClick, onCloseClick } = this.props;
    const title = isAdding ? 'Add New Ingredient' : `Editing Ingredient`;

    return (
      <>
        {!isAdding &&
          <output className='Ingredient__display'>
            {(!currentIngredient.amount.value && currentIngredient.unit_set.value === 'none' && !currentIngredient.ing_text.value)
              ? `A preview of your ingredient will display here.`
              : `${IngredientEditUnitOutput(currentIngredient.amount.value, currentIngredient.unit_plural, currentIngredient.unit_single)} ${currentIngredient.ing_text.value}`}
          </output>
        }
        <fieldset
          className='Fieldset Fieldset__Ingredient'
          disabled={disableFieldsets || (isAdding && !!currentIngredient.id) || (!isAdding && !allowIngredientEdits)}
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
          {(isAdding && !currentIngredient.id)
            ? <output className='Ingredient__display'>
              {(!currentIngredient.amount.value && currentIngredient.unit_set.value === 'none' && !currentIngredient.ing_text.value)
                ? `A preview of your new ingredient will display here.`
                : `${IngredientEditUnitOutput(currentIngredient.amount.value, currentIngredient.unit_plural, currentIngredient.unit_single)} ${currentIngredient.ing_text.value}`}
            </output>
            : <p>This form is disabled while you edit an ingredient.</p>
          }
          <div className="Ingredient__Options">
            <Button className="Ingredient__Options__button" type='button' onClick={event => handleSubmit(event, currentIngredient)}>
              Submit
            </Button>
            {isAdding
              ? <Button className="Ingredient__Options__button" onClick={() => onCloseClick()}>
                Close
              </Button>
              : <Button className="Ingredient__Options__button" onClick={() => onCancelClick()}>
                Cancel
                </Button>
            }
          </div>
        </fieldset>
      </>
    )
  };
};