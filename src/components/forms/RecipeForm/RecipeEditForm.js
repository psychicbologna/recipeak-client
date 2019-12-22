import React, { Component } from 'react';
import RecipeFormContext, { nullRecipe } from '../../../contexts/RecipeFormContext';
import IngredientsFieldset from './IngredientsFieldset/IngredientsFieldset';
import '../forms.css'
import { BasicInfoFieldset, PrepTimeFieldset, TextArea } from '../../Utils/Utils'

export default class RecipeEditForm extends Component {

  static defaultProps = {
    recipe: nullRecipe,
    deleting: false,
  }

  state = {
    recipe: this.props.recipe,
    //Freezes inputs when 'delete' clicked.
    deleting: this.props.deleting
  }

  static contextType = RecipeFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const { updateRecipeField, onSubmit } = this.context;
    const { recipe } = this.props;

    return (
      <form
        className='NewRecipeForm'
        onSubmit={event => onSubmit(event, 'edit')}
      >
        <BasicInfoFieldset
          nameDefault={recipe.name.value}
          authorDefault={recipe.author.value}
          servingsDefault={recipe.servings.value}
          updateRecipeField={updateRecipeField}
          disabled={this.state.deleting}
        />
        <PrepTimeFieldset
          hoursDefault={recipe.prep_time_hours.value}
          minutesDefault={recipe.prep_time_minutes.value}
          updateRecipeField={updateRecipeField}
          disabled={this.state.deleting}
        />
        <IngredientsFieldset
          disabled={this.state.deleting}
        />
        <TextArea
          updateField={updateRecipeField}
          defaultValue={!recipe.instructions.value ? null : recipe.instructions.value}
          areaId='instructions'
          areaLabel='Instructions'
          disabled={this.state.deleting}
        />

        <button type='submit' disabled={this.state.deleting}>
          Submit
        </button>
      </form >
    )
  }
};