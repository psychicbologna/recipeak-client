import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitApiService from '../../../../services/unit-api-service';
import UnitSelect from './UnitSelect';
import { IngredientEditUnitOutput, Input, Button } from '../../../Utils/Utils';

// The fieldset that is use for editing or adding an ingredient.
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
      id: this.props.ingredient.id,
      amount: { value: this.props.ingredient.amount, touched: false },
      ing_text: { value: this.props.ingredient.ing_text, touched: false },
      unit_set: { value: this.props.ingredient.unit_set, touched: false },
      unit_single: this.props.unit_data.unit_single,
      unit_plural: this.props.unit_data.unit_plural,
    }
  }

  componentWillUnmount() {
    this.clearCurrentIngredient();
  }

  //Update fields of current ingredient in the recipe form context.
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

  //Ingredient List manipulations. These are stored in state and do not affect database until the whole form is submitted.
  getUnitData = unit_set => {
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

    //Retrieve unit data and attach to new ingredient before making its state.
    const unitData = this.setUnitData(ingredient, newFields);

    return unitData.then(unitData => {
      newCurrentIngredient.unit_single = unitData.unit_single;
      newCurrentIngredient.unit_plural = unitData.unit_plural;
      this.setState({ currentIngredient: newCurrentIngredient })
      return newCurrentIngredient;
    });

  }

  //Submits the ingredient.
  onSubmitClick = (event, currentIngredient) => {
    event.preventDefault();
    this.props.onSubmit(currentIngredient)
    this.clearCurrentIngredient();
  }

  //Clears the inputs when clear button is clicked.
  onClearClick = (event) => {
    event.preventDefault();
    this.clearCurrentIngredient();
  }

  //Clears the inputs.
  clearCurrentIngredient = () => {
    this.setState({
      currentIngredient: {
        id: this.props.ingredient.id,
        amount: { value: this.props.ingredient.amount, touched: false },
        ing_text: { value: this.props.ingredient.ing_text, touched: false },
        unit_set: { value: this.props.ingredient.unit_set, touched: false },
        unit_single: this.props.unit_data.unit_single,
        unit_plural: this.props.unit_data.unit_plural,
      }
    })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set').value = 'none';
  }

  render() {
    const { currentIngredient } = this.state;
    const { isAdding, onCancelClick, disableFieldsets } = this.props;
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
          disabled={disableFieldsets}
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
          {isAdding
            && <output className='Ingredient__display'>
              {(!currentIngredient.amount.value && currentIngredient.unit_set.value === 'none' && !currentIngredient.ing_text.value)
                ? `A preview of your new ingredient will display here.`
                : `${IngredientEditUnitOutput(currentIngredient.amount.value, currentIngredient.unit_set.value, currentIngredient.unit_plural, currentIngredient.unit_single)} ${currentIngredient.ing_text.value}`}
            </output>
          }
          <div className="Ingredient__Options">
            <Button className="Ingredient__Options__button" type='button' onClick={event => this.onSubmitClick(event, currentIngredient)}>
              Submit
            </Button>
            {isAdding
              ? <Button className="Ingredient__Options__button" onClick={event => this.onClearClick(event)}>
                Clear
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