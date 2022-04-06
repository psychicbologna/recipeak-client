import React, { Component } from 'react';
import Input from '../../Input/Input';
import { PrepTimeOutput } from '../../../Utils/Utils';

export default class PrepTimeFieldset extends Component {
  render() {
  const { updateRecipeField, hoursDefault, minutesDefault, disabled } = this.props;
  return (
    <fieldset
      className='Fieldset RecipesForm__prep-time'
      id='prep_time_fieldset'
      disabled={disabled}>
      <legend>Prep Time</legend>
      <div className="Fieldset__input-row-fix">
        <Input
          updateField={updateRecipeField}
          defaultValue={!hoursDefault ? null : hoursDefault}
          inputId='prep_time_hours'
          inputLabel='Hours'
          inputType='number'
          max='59'
          parentForm='RecipeForm'
        />
        <Input
          updateField={updateRecipeField}
          defaultValue={!minutesDefault ? null : minutesDefault}
          inputId='prep_time_minutes'
          inputLabel='Minutes'
          inputType='number'
          max='59'
          parentForm='RecipeForm'
        />
      </div>
      <PrepTimeOutput hours={hoursDefault} minutes={minutesDefault} />
    </fieldset>
  )
  }
}