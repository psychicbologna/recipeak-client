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
      showOptions: this.props.showOptions
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

  handleDeleteClick = (event) => {
    event.preventDefault();

    console.log(this.props.ingredient.id);
  }

  //Set currentIngredient in context
  handleEditClick = (event) => {
    //Freeze other ingredients on list
    this.props.onSetEditingId(this.props.ingredient.id);
    //Set currentIngredient
    const setIngredient = this.context.setCurrentIngredient(this.props.ingredient)
    return setIngredient.then(() => {
        //Render the populated fieldset instead of ingredient.
        return this.toggleEditing()
      });
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