import React, { Component } from 'react';
import RecipeFormContext, { nullIngredient } from '../../../../contexts/RecipeFormContext';
import UnitApiService from '../../../../services/unit-api-service';
import Input from '../../Input/Input';
import UnitSelect from './UnitSelect/UnitSelect';
import { IngredientEditUnitOutput, Button } from '../../../Utils/Utils';

// The fieldset that is use for editing or adding an ingredient.
export default class IngredientFieldset extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    ingredient: nullIngredient,
    unit_data: {
      class: '',
      unit_single: '',
      unit_plural: '',
    },
    disabled: false,
    isAdding: false,
  }

  state = {
    currentIngredient: {
      id: this.props.ingredient.id,
      amount: { value: this.props.ingredient.amount, touched: false },
      ing_text: { value: this.props.ingredient.ing_text, touched: false },
      unit_set: { value: this.props.ingredient.unit_set, touched: false },
      unit_single: this.props.unit_data.unit_single,
      unit_plural: this.props.unit_data.unit_plural,
      custom_single: { value: this.props.unit_data.unit_single, touched: false },
      custom_plural: { value: this.props.unit_data.unit_plural, touched: false },
    }
  }

  componentWillUnmount() {
    this.clearCurrentIngredient();
  }

  //Update fields of current ingredient in the recipe form context.
  updateIngredientField = (fieldName, value) => {
    if (fieldName === 'unit_set') {
      if (value === 'custom') {
        //Set display values to the current custom values.
        this.setState(prevState => ({
          currentIngredient: {
            ...prevState.currentIngredient,
            unit_single: this.state.currentIngredient.custom_single.value,
            unit_plural: this.state.currentIngredient.custom_plural.value,
          }
        }))
      } else {
        //Set display values to preassigned sets.
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

    if (fieldName === 'custom_single') {
      this.setState(prevState => ({
        currentIngredient: {
          ...prevState.currentIngredient,
          unit_single: value,
          custom_single: { value, touched: true }
        }
      }))
    }

    if (fieldName === 'custom_plural') {
      this.setState(prevState => ({
        currentIngredient: {
          ...prevState.currentIngredient,
          unit_plural: value,
          custom_plural: { value, touched: true }
        }
      }))
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

  setUnitData = (ingredient) => {
    let unitData = {
      unit_single: '',
      unit_plural: ''
    };

    if (ingredient.unit_set === 'custom') {
      if (!!ingredient.unit_data.unit_single && !!ingredient.unit_data.unit_plural) {
        unitData.unit_single = ingredient.unit_data.unit_single;
        unitData.unit_plural = ingredient.unit_data.unit_plural;
      }
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
    document.getElementById('ing_text').value = this.props.ingredient.ing_text;
    document.getElementById('amount').value = this.props.ingredient.amount;
    document.getElementById('unit_set').value = this.props.ingredient.unit_set;
  }

  //Clears the inputs when clear button is clicked.
  onClearClick = (event) => {
    event.preventDefault();
    this.clearCurrentIngredient();
    document.getElementById('ing_text').value = this.props.ingredient.ing_text;
    document.getElementById('amount').value = this.props.ingredient.amount;
    document.getElementById('unit_set').value = this.props.ingredient.unit_set;
  }

  //Clears the inputs back to default state.
  clearCurrentIngredient = () => {
    this.setState({
      currentIngredient: {
        id: this.props.ingredient.id,
        amount: { value: this.props.ingredient.amount, touched: false },
        ing_text: { value: this.props.ingredient.ing_text, touched: false },
        unit_set: { value: this.props.ingredient.unit_set, touched: false },
        unit_single: this.props.unit_data.unit_single,
        unit_plural: this.props.unit_data.unit_plural,
        custom_single: { value: this.props.unit_data.unit_single, touched: false },
        custom_plural: { value: this.props.unit_data.unit_plural, touched: false },
      }
    })
  }

  render() {
    const { currentIngredient } = this.state;
    const { isAdding, onCancelClick, disableFieldsets, unit_data } = this.props;
    const title = isAdding ? 'Add New Ingredient' : `Editing Ingredient`;
    const fieldsetId = isAdding ? 'add_ingredient_fieldset' : `editing_ingredient_${currentIngredient.id}_fieldset`;

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
          id={fieldsetId}
          disabled={disableFieldsets}
        >
          <div className='Fieldset__input-row-fix'>
            <legend>{title}</legend>
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
              unit_data={unit_data}
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