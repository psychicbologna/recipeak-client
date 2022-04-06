import React, { Component } from 'react';
import Input from '../../Input/Input'

export default class BasicInfoFieldset extends Component {
  render() {
    const { updateRecipeField, nameDefault, authorDefault, servingsDefault, disabled } = this.props;

    return (
      <fieldset
        className='Fieldset RecipesForm__basic-info'
        id='basic_info_fieldset'
        disabled={disabled}>
        <legend>Basic Info</legend>
        <Input
          updateField={updateRecipeField}
          defaultValue={nameDefault}
          inputId='name'
          inputName='name'
          inputType='text'
          inputLabel='Recipe Name'
          parentForm='RecipeForm'
        />
        <Input
          updateField={updateRecipeField}
          defaultValue={authorDefault}
          inputId='author'
          inputName='author'
          inputType='text'
          inputLabel='Author'
          parentForm='RecipeForm'
        />
        <Input
          updateField={updateRecipeField}
          defaultValue={servingsDefault}
          inputId='servings'
          inputName='servings'
          inputType='number'
          inputLabel='Servings'
          parentForm='RecipeForm'
        />
      </fieldset>
    )
  }
}