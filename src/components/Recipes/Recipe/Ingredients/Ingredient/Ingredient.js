import React, { Component } from 'react';
import IngredientOptionsBase from './IngredientOptionsBase';
import IngredientFieldSet from '../../../../forms/RecipeForm/IngredientFieldset/IngredientFieldset'
import IngredientOptionsConvert from './IngredientOptionsConvert';
import { DisplayAmountWithUnit } from '../../../../Utils/Utils';
import RecipeFormContext, { nullIngredient } from '../../../../../contexts/RecipeFormContext';
import './Ingredient.css'

export const nullConversion = {
  amount: '',
  class: '',
  unit_abbr: '',
  unit_plural: '',
  unit_single: '',
}

export default class Ingredient extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    key: '',
    ingredient: nullIngredient,
    conversion: nullConversion,
    amount: '',
    name: '',
    showOptions: false,
    allowIngredientEdits: true
  }

  constructor(props) {
    super(props);

    this.state = {
      conversion: nullConversion,
      converted: false,
      editing: false,
      showOptions: this.props.showOptions,
      currentIngredient: nullIngredient
    }
  }

  //Loads conversion data if there is any, as well as whether or not there is a parent-level setting to show converted data.
  componentDidMount() {
    this.setState({
      conversion: this.props.conversion,
      converted: false,
    })
  }

  //Toggle whether or not to show the converted unit.
  toggleConvert = event => {
    event.preventDefault();
    this.setState({ converted: !this.state.converted })
  }

  //Toggle whether or not this ingredient is being edited.
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }

  //Set current ingredient from list when edit is clicked.
  setCurrentIngredient = (ingredient) => {

    let newCurrentIngredient = { ...nullIngredient };
    const newFields = Object.keys(ingredient);
    const unitDataFields = Object.keys(ingredient.unit_data);

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

    const unitData = this.setUnitData(ingredient, unitDataFields);

    return unitData.then(unitData => {
      console.log(unitData);
      newCurrentIngredient.unit_single = unitData.unit_single;
      newCurrentIngredient.unit_plural = unitData.unit_plural;
      this.setState({ currentIngredient: newCurrentIngredient })
      return newCurrentIngredient;
    });

  }


  clearCurrentIngredient = () => {
    console.log(this.state.currentIngredient);
    this.setState({
      currentIngredient: nullIngredient
    })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set').value = 'none';
  }

  handleDeleteClick = (event) => {
    event.preventDefault();

    console.log(this.props.ingredient.id);
  }

  handleEditClick = (event) => {
    //Freeze other ingredients on list
    this.props.onSetEditingId(this.props.ingredient.id);
    //Render the populated fieldset instead of ingredient.
    this.toggleEditing()
  }

  //Submit currentIngredient and close fieldset if successful.
  handleEditSubmit = (event, id) => {
    event.preventDefault();

    this.context.submitCurrentIngredient()
      .then(this.toggleEditing())
      .catch(error => console.log('Something went wrong.'))
  }

  //Abort editing an ingredient and close fieldset.
  handleCancelClick = () => {
    this.props.onClearEditingId();
    this.toggleEditing();
  }

  render() {
    const { ingredient, editingId, allowIngredientEdits } = this.props;
    const { converted, editing, showOptions } = this.state;

    const className = `Ingredient Ingredient__${showOptions ? 'editing' : 'listing'} ${!!editingId && editingId !== ingredient.id && 'disabled'}`

    return (
      <li className={className} key={ingredient.id}>
        {!editing
          ? <span className='Ingredient__display'>
            {`${DisplayAmountWithUnit(ingredient, converted)} ${ingredient.ing_text}`}
          </span>
          : <IngredientFieldSet
            editing={true}
            onCancelClick={this.handleCancelClick}
            ingredient={ingredient}
          />
        }
        {(showOptions && !editing && ingredient.hasOwnProperty('conversion')) &&
          <IngredientOptionsConvert
            ingredient={ingredient}
            converted={converted}
            toggleConvert={this.toggleConvert}
          />
        }
        {(showOptions && !editing) &&
          <IngredientOptionsBase
            editingIngredient={editing}
            ingredient={ingredient}
            onDeleteIngredient={this.handleDeleteClick}
            onEditIngredient={this.handleEditClick}
            disabled={(!!editingId && editingId !== ingredient.id) || !allowIngredientEdits}
          />
        }
      </li>
    )
  }
}