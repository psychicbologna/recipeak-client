import React, { Component } from 'react';
import UnitService from '../../../../services/unit-api-service';
import UnitSelectContext, { nullUnit } from '../../../../contexts/UnitSelectContext.js'

export default class UnitSelect extends Component {
  static defaultProps = {
    ingredient_id: '',
    units: [],
    currentUnit: {
      nullUnit
    },
    match: { params: {} },
  }

  static contextType = UnitSelectContext;

  componentDidMount() {
    UnitService.getUnits()
      .then(this.context.setUnits)
      // .then(units => {
      //   // console.log('Units:', units) //TODO Units are showing up but not passing to context.
      //   this.context.setUnits(units)
      // })
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearUnits();
  }

  // unitsSorter(units) {
  //   let units_apprx, units_metric, units_us;

  //   units_apprx = units.map(unit => !unit.class);
  //   units_us = units.map(unit => unit.class === 'us');
  //   units_metric = units.map(unit => unit.class === 'met');

  //   units_us.class = 'US';
  //   units_metric.class = 'Metric';

  //   // console.log(`Approximate:`, units_apprx)
  //   // console.log(`${units_metric.class}:`, units_metric)
  //   // console.log(`${units_us.class}:`, units_us)
  // }

  // unitOption(unit) {
  //   const unit_data = unit.unit_data
  //   const unit_set = unit.unit_set
  //   const unit_displayName = unit_data.unit_plural // TODO Capitalize first letter

  //   return (
  //     <option value={unit_set}>{unit_displayName}</option>
  //   )
  // }

  // unitOptGroup(groupName, units) {

  //   if (!units) {
  //     return <option>Loading Options...</option>
  //   } else {
  //     return (
  //       <optgroup label={groupName}>
  //         {units.map(unit => this.unitOption(unit))}
  //       </optgroup>
  //     )
  //   }
  // }

  // renderUnitSetSelect(units, recipe_id, ingredient_id) {

  //   return (
  //     //TODO Map to optgroup by unit_data.
  //     <select className='IngredientForm__unit_set'>
  //       <option value='1'>Meep</option>
  //       <option value='2'>Moop</option>
  //       <option value='3'>Maap</option>
  //       <optgroup label='US Measurements'>
  //         <option value='oz'>oz</option>
  //         <option value='lb'>lb</option>
  //         <option value='tsp'>tsp</option>
  //         <option value='tbsp'>tbsp</option>
  //         <option value='floz'>fl oz</option>
  //         <option value='cup'>cup</option>
  //         <option value='pt'>pt</option>
  //         <option value='qrt'>qrt</option>
  //         <option value='gal'>gal</option>
  //       </optgroup>
  //       <optgroup label='Metric Measurements'>
  //         <option value='mg'>mg</option>
  //         <option value='g'>g</option>
  //         <option value='kg'>kg</option>
  //         <option value='ml'>ml</option>
  //         <option value='l'>l</option>
  //         <option value='dl'>dl</option>
  //       </optgroup>
  //     </select>
  //   )
  // }

  // renderSetUnitData(unit_data) {
  //   let singular, plural

  //   singular = unit_data.unit_singular;
  //   plural = unit_data.unit_plural;

  //   if (this.props.amount === 1) {
  //     return (
  //       <p>{singular}</p>
  //     )
  //   } else {
  //     return (
  //       <p>{plural}</p>
  //     )
  //   }
  // }

  // renderUnitDataInput() {
  //   //TODO Autosuggest from apprx sets?
  //   return (
  //     <section className='IngredientsForm__unit_data'>
  //       <label>Unit Singular</label>
  //       <input name="IngredientForm__unit_singular" />
  //       <label>Unit Plural</label>
  //       <input name="IngredientForm__unit_plural" />
  //     </section>
  //   );
  // }

  render() {
    console.log('Context:', this.context);
    return (
      <section>
        <p>Testing</p>
        {/* {this.props.unitSetSelected !== 'none'
          ? this.renderSetUnitData()
          : this.renderUnitDataInput()}
        {this.renderUnitSetSelect()} */}
      </section>
    )

  }


};