import React, { Component } from 'react';
import { Input } from '../../../Utils/Utils';

export default class CustomUnitFieldset extends Component {

  render() {
    const { single, plural, updateField } = this.props;
    return (
      <fieldset className='RecipeForm__CustomUnitFieldset'>
        <Input
          defaultValue={single}
          updateField={updateField}
          inputId='unit_single'
          inputLabel='Singular'
          inputType='text'
          parentForm='RecipeForm'
        />
        <Input
          defaultValue={plural}
          updateField={updateField}
          inputId='unit_plural'
          inputLabel='Plural'
          inputType='text'
          parentForm='RecipeForm'
        />
      </fieldset>
    );
  }
}