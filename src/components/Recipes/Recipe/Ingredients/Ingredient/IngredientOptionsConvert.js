import React, { Component } from 'react';
import { Button } from '../../../../Utils/Utils'

export default class IngredientOptionsConvert extends Component {

  componentDidMount() {
    this.setState({ converted: this.props.converted })
  }

  render() {
    const { ingredient, toggleConvert, converted } = this.props;
    const { conversion, unit_data } = ingredient;

    return (
      <div className='Ingredient__Options IngredientOptionsConvert'>
        {!converted
          ? <Button
            className="Ingredient__Options__button convert-to"
            type='button'
            onClick={event => toggleConvert(event)}>
            Convert to {`${conversion.class} ${conversion.unit_abbr}`}
          </Button>
          : <Button
            className="Ingredient__Options__button convert-back"
            type='button'
            onClick={event => toggleConvert(event)}>
            Convert back to {`${unit_data.class} ${unit_data.unit_abbr}`}
          </Button>
        }
      </div>
    )
  }
}