import React, { Component } from 'react';
import UnitApiService from '../services/unit-api-service'

export const nullUnits = {
  base: [],
  apprx: [],
  us: [],
  metric: []
}

const UnitContext = React.createContext({
  units: nullUnits,
  error: null,
  setError: () => { },
  clearError: () => { },
  setUnits: () => { },
})

export default UnitContext;

export class UnitContextProvider extends Component {
  state = {
    units: nullUnits,
    error: null,
  }

  fetchUnits = () => {
    if (this.state.units === nullUnits) {
      UnitApiService.getUnits()
        .then(units => {
          this.setUnits(units)
          return units
        })
        .catch(() => this.setError({
          error: { message: 'Unable to retrieve unit data.' }
        }));
    }
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
  }

  clearUnits = () => {
    this.setState({ units: [] })
  }

  render() {
    const value = {
      units: this.state.units,
      error: this.state.error,
      setUnits: this.setUnits,
      setError: this.setError,
      clearError: this.clearError,
      clearUnits: this.clearUnits,
      fetchUnits: this.fetchUnits
    };

    return (
      <UnitContext.Provider value={value}>
        {this.props.children}
      </UnitContext.Provider>
    )
  }
};