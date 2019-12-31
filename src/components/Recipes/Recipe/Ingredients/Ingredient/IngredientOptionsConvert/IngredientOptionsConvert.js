import React, { Component } from 'react';
import { Button } from '../../../../../Utils/Utils'

//The conversion options menu for an ingredient. Includes a button that toggles to a converted view.
export default class IngredientOptionsConvert extends Component {

  static defaultProps = {
    ingredient: {
      conversion: {},
      unit_data: {}
    },
    toggleConvert: false,
    converted: false
  }

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
            Convert to {`${conversion.class} ${conversion.unit_plural}`}
          </Button>
          : <Button
            className="Ingredient__Options__button convert-back"
            type='button'
            onClick={event => toggleConvert(event)}>
            Convert back to {`${unit_data.class} ${unit_data.unit_plural}`}
          </Button>
        }
      </div>
    )
  }
}