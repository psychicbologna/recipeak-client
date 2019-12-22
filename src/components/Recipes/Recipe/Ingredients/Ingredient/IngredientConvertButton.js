import React, { Component } from 'react';

export default class IngredientConvertButton extends Component {

componentDidMount() {
  this.setState({ converted: this.props.converted })
}

render() {
  const { convertUnitName, baseUnitName, toggleConvert, converted } = this.props;

  return (!converted
    ? <button
      className="Ingredient__button convert-to"
      type='button'
      onClick={event => toggleConvert(event)}>
      Convert to {`${convertUnitName}`}
    </button>
    : <button
      className="Ingredient__button convert-back"
      type='button'
      onClick={event => toggleConvert(event)}>
      Convert back to {`${baseUnitName}`}
    </button>
  )
}
}