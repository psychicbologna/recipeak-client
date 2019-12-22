import React, { Component } from 'react';
import RecipeFormContext, { nullRecipe } from '../../../contexts/RecipeFormContext';
import IngredientsFieldset from './IngredientsFieldset/IngredientsFieldset';
import '../forms.css'
import { BasicInfoFieldset, PrepTimeFieldset, TextArea } from '../../Utils/Utils'

//TODO ensure all fieldsets are disabled when deleting is true.

export default class RecipeEditForm extends Component {

  static defaultProps = {
    recipe: nullRecipe,
  }

  state = {
    recipe: this.props.recipe,
  }

  static contextType = RecipeFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const { updateRecipeField, onSubmit, disableFieldsets } = this.context;
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
          disabled={disableFieldsets}
        />
        <PrepTimeFieldset
          hoursDefault={recipe.prep_time_hours.value}
          minutesDefault={recipe.prep_time_minutes.value}
          updateRecipeField={updateRecipeField}
          disabled={disableFieldsets}
        />
        <IngredientsFieldset />
        <TextArea
          updateField={updateRecipeField}
          defaultValue={!recipe.instructions.value ? null : recipe.instructions.value}
          areaId='instructions'
          areaLabel='Instructions'
          disabled={disableFieldsets}
        />

        <button type='submit' disabled={disableFieldsets}>
          Submit
        </button>
      </form >
    )
  }
};