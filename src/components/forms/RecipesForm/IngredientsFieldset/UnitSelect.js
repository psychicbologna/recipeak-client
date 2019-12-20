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

  unitOption(unit) {
    //Sets option field for unit
    const id = unit.id,
      unit_data = unit.unit_data,
      unit_set = unit.unit_set,
      unit_displayName = (unit_set === 'none') ? 'none' : unit_data.unit_plural.toUpperCase();

    return (
      <option key={id} value={unit_set}>{unit_displayName}</option>
    )
  }

  unitOptGroup(unitObject) {
    //Sets option group for unit class.
    return (
      <optgroup label={unitObject}>
        {unitObject.map(unit => this.unitOption(unit))}
      </optgroup>
    )
  }

  renderUnitSetSelect() {
    const { updateUnitSet } = this.context;
    if (!this.props.units.length) {
      return <p>Loading units...</p>
    } else {
      let units = this.props.units;

      return (

        <select className='IngredientForm__unit_set' id='unit_set_select' defaultValue='none' onChange={e => updateUnitSet(e.target.value)}>
          {this.unitOptGroup(units.none)}
          {this.unitOptGroup(units.apprx)}
          {this.unitOptGroup(units.us)}
          {this.unitOptGroup(units.metric)}
        </select>
      )
    }
  }

  render() {
    const { currentIngredient, updateUnitSingular, updateUnitPlural } = this.context;
    let singular = currentIngredient.unit_singular.value,
      plural = currentIngredient.unit_plural.value,
      unitSet = currentIngredient.unit_set.value;

    return (
      <section>
        <label>Unit From Set</label>
        {this.renderUnitSetSelect()}
        <UnitDataInput
          unitSet={unitSet}
          singular={singular}
          plural={plural}
          updateUnitSingular={updateUnitSingular}
          updateUnitPlural={updateUnitPlural}
          amount={currentIngredient.amount}
        />
      </section>
    )

  }


};

function SetUnitData(props) {
  if (props.amount === 1) {
    return (
      <p>{props.singular}</p>
    )
  } else {
    return (
      <p>{props.plural}</p>
    )
  }
}

function UnitDataInput(props) {
  //TODO Autosuggest from apprx sets?
  if (props.unitSet === 'Custom') {
    return (
      <fieldset className='__unit_data'>
        <legend>Define Custom Unit</legend>
        <label>Unit Singular</label>
        <input name="IngredientForm__unit_singular" onChange={e => props.updateUnitSingular(e.target.value)} />
        <label>Unit Plural</label>
        <input name="IngredientForm__unit_plural" onChange={e => props.updateUnitPlural(e.target.value)} />
      </fieldset>
    );
  } else {
    return (
      <>
        <SetUnitData amount={props.amount} singular={props.singular} plural={props.plural} />
      </>
    )
  }
}