import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitSelect from './UnitSelect';
import UnitApiService from '../../../../services/unit-api-service';
import ConversionService from '../../../../services/conversion-api-service';
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
    currentIngredient: nullIngredient,
  }

  componentWillUnmount() {
    this.clearCurrentIngredient();
  }

  //Update fields of current ingredient
  updateIngredientField = (fieldName, value) => {
    if (fieldName === 'unit_set') {
      if (value === 'custom') {
        return this.setState(prevState => ({
          currentIngredient: {
            ...prevState.currentIngredient,
            unit_single: '',
            unit_plural: ''
          }
        }))
      } else {
        return this.getUnitData(value)
          .then(unitDataFromSet => {
            return this.setState(prevState => ({
              currentIngredient: {
                ...prevState.currentIngredient,
                unit_set: { value, touched: true },
                unit_single: unitDataFromSet.unit_single,
                unit_plural: unitDataFromSet.unit_plural
              }
            }))
          })
      }
    }
    this.setState(prevState => ({
      currentIngredient: {
        ...prevState.currentIngredient,
        [fieldName]: { value, touched: true }
      }
    }))
  }

  getUnitData = unit_set => {
    return UnitApiService.getUnitData(unit_set)
      .then(unitData => {
        const unit_single = unitData.unit_single;
        const unit_plural = unitData.unit_plural;
        return { unit_single, unit_plural }
      });
  }

  setUnitData = (ingredient, unitDataFields) => {
    let hasUnits = unitDataFields.includes('unit_single') && unitDataFields.includes('unit_plural')
    let unitData = {
      unit_single: '',
      unit_plural: ''
    };

    if (ingredient.unit_set === 'custom' && hasUnits) {
      //TODO must submit both single and plural unit, validate!
      unitData.unit_single = ingredient.unit_data.unit_single;
      unitData.unit_plural = ingredient.unit_data.unit_plural;
      return unitData;
    } else if (ingredient.unit_set === 'custom' && !hasUnits) {
      return unitData;
    } else {
      return this.getUnitData(ingredient.unit_set)
        .then(unitDataFromSet => {
          return unitDataFromSet;
        })
    }
  }

  render() {
    const { currentIngredient } = this.state;
    const { disableFieldsets } = this.context;
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
              updateField={this.updateIngredientField}
              inputId='amount'
              inputLabel='Amount'
              inputType='number'
              parentForm='RecipeForm'
            />
            <UnitSelect
              currentIngredient={this.state.currentIngredient}
              updateIngredientField={this.updateIngredientField}
            />
          </div>
          <Input
            defaultValue={currentIngredient.ing_text.value}
            updateField={this.updateIngredientField}
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