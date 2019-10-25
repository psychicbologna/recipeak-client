import React, { Component } from 'react'

export const nullUnit = {
  unit_id: '', //integer
  unit_set: '',
  unit_data: {
    singular: '',
    plural: '',
  },
}

const UnitSelectContext = React.createContext({
  units: [],
  currentUnit: nullUnit, //TODO passed down from ingredient?...
  selectedUnitSet: 'none', //TODO passed down from currentUnit?...
  error: null,
  setError: () => { },
  clearError: () => { },
  setUnits: () => { },
  clearUnits: () => { },
  setUnitData: () => { },
})

export default UnitSelectContext;

export class UnitSelectProvider extends Component {
  state = {
    units: [],
    error: null,
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUnits = units => {
    this.setState({ units })
    console.log('State:', this.state);
  }

  clearUnits = () => {
    this.setUnits([])
  }

  setUnitData = unit_data => {
    this.setState({ unit_data })
  }

  render() {
    const value = {
      units: this.units,
      currentUnit: this.currentUnit,
      selectedUnitSet: this.selectedUnitSet,
      error: this.error,
      setUnits: this.setUnits,
      setError: this.setError,
      clearError: this.clearError,
      clearUnits: this.clearUnits,
      setUnitData: this.setUnitData,
    };

    return (
      <UnitSelectContext.Provider value={value}>
        {this.props.children}
      </UnitSelectContext.Provider>
    )
  }
};