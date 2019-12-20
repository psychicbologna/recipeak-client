import React, { Component } from 'react';
import CustomUnitFieldSet from './CustomUnitFieldset'
import UnitSetSelect from '../../../forms/RecipeForm/IngredientsFieldset/UnitSetSelect';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';

export default class UnitSelect extends Component {

  static contextType = RecipeFormContext;

  render() {
    const { currentIngredient, updateIngredientField } = this.context;
    return (
      <section>
        <label>Unit From Set</label>
        <UnitSetSelect
          unitSet={currentIngredient.unit_set}
          updateField={updateIngredientField}
        />
        {
          currentIngredient.unit_set.value === 'custom'
          ? <CustomUnitFieldSet
          single={currentIngredient.unit_single.value}
          plural={currentIngredient.unit_plural.value}
          amount={currentIngredient.amount}
          updateField={updateIngredientField}
          />
          : null
        }
      </section>
    )
  }
};