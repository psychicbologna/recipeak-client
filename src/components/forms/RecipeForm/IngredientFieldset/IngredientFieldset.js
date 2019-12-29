import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitApiService from '../../../../services/unit-api-service';
import ConversionService from '../../../../services/conversion-api-service';
import uuidv1 from 'uuid/v1';
import UnitSelect from './UnitSelect';
import { IngredientEditUnitOutput, Input, Button } from '../../../Utils/Utils';

export default class IngredientFieldset extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    ingredient: nullIngredient,
    unit_data: {
      unit_single: '',
      unit_plural: '',
    },
    disabled: false,
    isAdding: false,
    allowIngredientEdits: true
  }

  state = {
    currentIngredient: {
      id: { value: this.props.ingredient.id, touched: false },
      amount: { value: this.props.ingredient.amount, touched: false },
      ing_text: { value: this.props.ingredient.ing_text, touched: false },
      unit_set: { value: this.props.ingredient.unit_set, touched: false },
      unit_single: this.props.unit_data.unit_single,
      unit_plural: this.props.unit_data.unit_plural,
    }
  }


  // componentWillMount() {
  //   this.setCurrentIngredient(this.props.ingredient)
  // }

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

  //Ingredient List manipulation. These do not affect database until the whole form is submitted.

  getUnitData = unit_set => {
    console.log(unit_set);
    return UnitApiService.getUnitData(unit_set)
      .then(unitData => {
        const unit_single = unitData.unit_single;
        const unit_plural = unitData.unit_plural;
        return { unit_single, unit_plural }
      });
  }

  setUnitData = (ingredient, unitFields) => {
    let hasUnits = unitFields.includes('unit_single') && unitFields.includes('unit_plural')
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

  //Set current ingredient from list when edit is clicked.
  setCurrentIngredient = (ingredient) => {

    let newCurrentIngredient = { ...nullIngredient };
    const newFields = Object.keys(ingredient);
    console.log(ingredient);

    //Convert key values to currentIngredient values.
    for (let i = 0; i < newFields.length; i++) {
      let field = newFields[i];

      if (field === 'id') {
        newCurrentIngredient[field] = ingredient[field]
      } else if (field === 'unit_data') {
        continue;
      } else {
        newCurrentIngredient[field] = { value: ingredient[field], touched: false }
      }
    }

    const unitData = this.setUnitData(ingredient, newFields);

    return unitData.then(unitData => {
      console.log(unitData);
      newCurrentIngredient.unit_single = unitData.unit_single;
      newCurrentIngredient.unit_plural = unitData.unit_plural;
      this.setState({ currentIngredient: newCurrentIngredient })
      return newCurrentIngredient;
    });

  }

  clearCurrentIngredient = () => {
    console.log('clearCurrentIngredient firing')
    console.log(this.state.currentIngredient);
    console.log('null? ...', nullIngredient)
    this.setState({
      currentIngredient: nullIngredient
    })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set').value = 'none';
  }

  onEditClick = () => {
    //Set currentIngredient
    const setIngredient = this.setCurrentIngredient(this.props.ingredient)
    return setIngredient.then(() => {
      //Render the populated fieldset instead of ingredient.
      this.props.onEditClick()
    });
  }

  //Add ingredient to preview list and queue for addition
  handleEditIngredient = (currentIngredient) => {
    console.log('editIngredient firing!')
    const newIngredient = {
      id: currentIngredient.id,
      amount: currentIngredient.amount.value,
      ing_text: currentIngredient.ing_text.value,
      unit_set: currentIngredient.unit_set.value,
    }

    if (currentIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_singular: currentIngredient.unit_singular.value,
        unit_plural: currentIngredient.unit_plural.value
      }

      this.context.updateIngredientListWithAddition(newIngredient)
    }
    console.log('Edit List: ', this.state.ingredientsEditList);
  }



  render() {
    const { currentIngredient } = this.state;
    const { isAdding, allowIngredientEdits, handleSubmit, onCancelClick, onCloseClick, disableFieldsets } = this.props;
    const title = isAdding ? 'Add New Ingredient' : `Editing Ingredient`;

    return (
      <>
        {!isAdding &&
          <output className='Ingredient__display'>
            {(!currentIngredient.amount.value && currentIngredient.unit_set.value === 'none' && !currentIngredient.ing_text.value)
              ? `A preview of your ingredient will display here.`
              : `${IngredientEditUnitOutput(currentIngredient.amount.value, currentIngredient.unit_set.value, currentIngredient.unit_plural, currentIngredient.unit_single)} ${currentIngredient.ing_text.value}`}
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
              currentIngredient={currentIngredient}
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