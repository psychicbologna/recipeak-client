import React, { Component } from 'react';

const UnitContext = React.createContext({
  units: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setUnits: () => {},
})

export default UnitContext;

export class UnitContextProvider extends Component {
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
  }

  clearUnits = () => {
    this.setState({ units: []})
  }

  render() {
    const value = {
      units: this.state.units,
      error: this.state.error,
      setUnits: this.setUnits,
      setError: this.setError,
      clearError: this.clearError,
      clearUnits: this.clearUnits,
    };

    return (
      <UnitContext.Provider value={value}>
        {this.props.children}
      </UnitContext.Provider>
    )
  }
};