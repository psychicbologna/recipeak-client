import React, { Component } from 'react';
import CustomUnitFieldSet from './CustomUnitFieldset'
import UnitSetSelect from './UnitSetSelect';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';

export default class UnitSelect extends Component {

  static contextType = RecipeFormContext;

  render() {
    const { currentIngredient, updateIngredientField } = this.context;
    console.log('UnitSelect unitSet:', currentIngredient.unit_set)

    return (
      <section>
        <label>Unit From Set</label>
        <UnitSetSelect
          defaultValue={currentIngredient.unit_set.value}
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