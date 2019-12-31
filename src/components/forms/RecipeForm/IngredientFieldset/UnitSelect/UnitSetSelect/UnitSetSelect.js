import React, { Component } from 'react';
import { OptGroup } from '../../../../../Utils/Utils';
import UnitContext, { nullUnits } from '../../../../../../contexts/UnitContext';

export default class UnitSetSelect extends Component {

  static defaultProps = {
    defaultValue: 'none',
  }

  static contextType = UnitContext;

  componentDidMount() {
    this.context.clearError();
    // this.context.fetchUnits();
  }

  render() {
    const { updateField, defaultValue } = this.props;
    const { units, error } = this.context;

    if (units === nullUnits) {
      return <p>Loading units...</p>
    } else if (!!error) {
      return (
        <p className="Alert__p">{error}</p>
      )
    } else {
      return (
        <select
          className='IngredientForm__unit_set UnitSetSelect__select '
          id='unit_set'
          name='unit_set'
          value={defaultValue}
          onChange={event => updateField('unit_set', event.target.value)}
        >
          <OptGroup group={units.base} name='Base' />
          <OptGroup group={units.us} name='US' />
          <OptGroup group={units.metric} name='Metric' />
          <OptGroup group={units.apprx} name='Approximate' />
        </select>)
    }
  }
}
