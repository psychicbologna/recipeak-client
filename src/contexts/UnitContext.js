import React, { Component } from 'react';
import UnitApiService from '../services/unit-api-service'

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
    units: {},
    error: null,
  }

  componentDidMount() {
    UnitApiService.getUnits()
      .then(units => {
        console.dir(units)
        this.setUnits(units)
      })
      .catch(this.setState({
        hasError: true,
        error: { message: 'Unable to retrieve unit data.' }
      }));
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