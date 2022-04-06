import React, { Component } from 'react';
import Input from '../../../../Input/Input';

export default class CustomUnitFieldset extends Component {

  static defaultProps = {
    single: '',
    plural: '',
  }

  render() {
    const { defaultUnitData: single, plural, updateField } = this.props;
    return (
      <fieldset className='RecipeForm__CustomUnitFieldset'>
        <legend>Define Custom Unit</legend>
        <Input
          defaultValue={single}
          updateField={updateField}
          inputId='custom_single'
          inputLabel='Singular'
          inputType='text'
          parentForm='RecipeForm'
        />
        <Input
          defaultValue={plural}
          updateField={updateField}
          inputId='custom_plural'
          inputLabel='Plural'
          inputType='text'
          parentForm='RecipeForm'
        />
      </fieldset>
    );
  }
}