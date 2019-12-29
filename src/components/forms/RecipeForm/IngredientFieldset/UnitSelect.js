import React, { Component } from 'react';
import CustomUnitFieldSet from './CustomUnitFieldset'
import UnitSetSelect from './UnitSetSelect';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';

export default class UnitSelect extends Component {

  static contextType = RecipeFormContext;

  render() {
    const { currentIngredient, updateIngredientField } = this.props;
    const unit_set = currentIngredient.unit_set.value;

    return (
      <>
        <label className="UnitSelect__label">
          <span className="UnitSetSelect__label__description">Unit From Set</span>
          <UnitSetSelect
            defaultValue={!!unit_set ? unit_set : 'none'}
            updateField={updateIngredientField}
          />
        </label>
        {
          currentIngredient.unit_set.value === 'custom'
            ? <div className="Fieldset__input-row-fix">
              <CustomUnitFieldSet
                single={currentIngredient.unit_single.value}
                plural={currentIngredient.unit_plural.value}
                amount={currentIngredient.amount}
                updateField={updateIngredientField}
              />
            </div>
            : null
        }
      </>
    )
  }
};