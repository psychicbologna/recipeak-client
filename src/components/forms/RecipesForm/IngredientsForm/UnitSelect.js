import React, { Component } from 'react';
import RecipesFormContext from '../../../../contexts/RecipesFormContext'

export default class UnitSelect extends Component {

  static contextType = RecipesFormContext;

  static defaultProps = {
    ingredient_id: '',
    units: [],
    currentUnit: {
      unit_id: '', //integer
      unit_set: '',
      unit_data: {
        singular: '',
        plural: '',
      },
    },
    match: { params: {} },
  }

  unitsSorter(units) {
    //Splits the units into three groups
    let units_apprx, units_metric, units_us;

    units_apprx = {
      units: units.filter(unit =>
        !unit.unit_data.class)
    };
    units_us = {
      units: units.filter(unit =>
        unit.unit_data.class === 'US'),
        class: 'US'
    };
    units_metric = {
      units: units.filter(unit =>
        unit.unit_data.class === 'Metric'),
        class: 'Metric'
    };

    return { units_apprx, units_us, units_metric }
  }

  unitOption(unit) {
    const id = unit.id,
      unit_data = unit.unit_data,
      unit_set = unit.unit_set,
      unit_displayName = (unit_set === 'none') ? 'none' : unit_data.unit_plural; // TODO Capitalize first letter

    return (
      <option key={id} value={unit_set}>{unit_displayName}</option>
    )
  }

  unitOptGroup(unitObject) {
      return (
        <optgroup label={unitObject.class}>
          {unitObject.units.map(unit => this.unitOption(unit))}
        </optgroup>
      )
    }
  

  renderUnitSetSelect(units, recipe_id, ingredient_id) {
    if (!this.props.units.length) {
      return <p>Loading units...</p>
    } else {
      let units = this.props.units;
      let sortedUnits = this.unitsSorter(units);

      return (

        <select className='IngredientForm__unit_set' id='unit_set_select' defaultValue='none' onChange={e => this.context.updateUnitSet(e.target.value)}>
          <option val='custom'>Custom</option>
          {sortedUnits.units_apprx.units.map(unit => this.unitOption(unit))}
          {this.unitOptGroup(sortedUnits.units_us)}
          {this.unitOptGroup(sortedUnits.units_metric)}
        </select>
      )
    }
  }

  renderSetUnitData(unit_data) {
    let singular, plural

    singular = unit_data.unit_singular;
    plural = unit_data.unit_plural;

    if (this.props.amount === 1) {
      return (
        <p>{singular}</p>
      )
    } else {
      return (
        <p>{plural}</p>
      )
    }
  }

  renderUnitDataInput() {
    //TODO Autosuggest from apprx sets?

    if (this.context.currentIngredient.unit_set === 'Custom') {
    return (
      <fieldset className='IngredientsForm__unit_data'>
        <legend>Define Custom Unit</legend>
        <label>Unit Singular</label>
        <input name="IngredientForm__unit_singular" onChange={e => this.context.updateUnitSingular(e.target.value)} />
        <label>Unit Plural</label>
        <input name="IngredientForm__unit_plural" onChange={e => this.context.updateUnitPlural(e.target.value)} />
      </fieldset>
    );
    } else {
      this.renderSetUnitData(this.context.currentIngredient.unit_set);
    }
  }

  render() {
    return (
      <section>
        {/* {this.props.unitSetSelected !== 'none'
          ? this.renderSetUnitData()
          : this.renderUnitDataInput()} */}
        <label>Unit From Set</label>
        {this.renderUnitSetSelect()}
        {this.renderUnitDataInput()}
      </section>
    )

  }


};