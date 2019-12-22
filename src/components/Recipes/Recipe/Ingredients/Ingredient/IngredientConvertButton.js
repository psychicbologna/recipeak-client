import React, { Component } from 'react';
import {Button} from '../../../../Utils/Utils'

export default class IngredientConvertButton extends Component {

componentDidMount() {
  this.setState({ converted: this.props.converted })
}

render() {
  const { convertUnitName, baseUnitName, toggleConvert, converted } = this.props;

  return (!converted
    ? <Button
      className="Ingredient__button convert-to"
      type='button'
      onClick={event => toggleConvert(event)}>
      Convert to {`${convertUnitName}`}
    </Button>
    : <Button
      className="Ingredient__button convert-back"
      type='button'
      onClick={event => toggleConvert(event)}>
      Convert back to {`${baseUnitName}`}
    </Button>
  )
}
}