import React, { Component } from 'react';
import { OptGroup } from '../../../Utils/Utils'
import UnitContext, { nullUnits } from '../../../../contexts/UnitContext';

export default class UnitSetSelect extends Component {

  static defaultProps = {
    defaultValue: 'none',
    units: nullUnits
  }

  static contextType = UnitContext;

  componentDidMount() {
    this.context.fetchUnits()
  }

  render() {
    const { updateField, defaultValue } = this.props;
    const { units } = this.context;

    console.log(defaultValue)
    return (
      <select
        className='IngredientForm__unit_set'
        id='unit_set'
        name='unit_set'
        value={defaultValue}
        onChange={event => updateField('unit_set', event.target.value)}
      >
        <OptGroup group={units.base} name='Base' />
        <OptGroup group={units.apprx} name='Approximate' />
        <OptGroup group={units.us} name='US' />
        <OptGroup group={units.metric} name='Metric' />
      </select>
    )
  }
}
