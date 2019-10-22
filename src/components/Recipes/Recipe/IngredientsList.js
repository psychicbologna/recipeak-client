import React, {Component} from 'react';
import Ingredient from './Ingredient';

export default class PrimaryNav extends Component {
  
  renderList() {
    const ingredients = this.props.ingredients;
    console.log(ingredients);
  }

  
  render() {
    const { error };
    let content;
    if (error) {
      content = (error.error === `Recipe doesn't exist`)
        ? <p className='red'>Recipe not found</p>
        : <p className='red'>There was an error</p>
    }
    return (
      <section className='IngredientList'>
      
      </section>
    )
  }
};

/*
Stub for display:

let selectName = {}

UnitOptionSerialize() {
  if (has unit_abbr) { selectName = `${unit.name}(${unit.unit_abbr})`}
}

*/