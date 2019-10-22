import React, { Component } from 'react';
import RecipeApiService from '../../../services/recipes-api-service'

//TODO fetch call to units for select
//TODO 

export default class Ingredient extends Component {
  static defaultProps = {
    ingredients: [],
    recipe_id: '',
    newIngredient: {
      unit_set: '',
      unit_data: {
        unit_singular:'',
        unit_plural:'',
      }, //json!
    },
    units: {
      unit_id: '', //integer
      unit_set: '',
      unit_data: {},
    }
  }
  render() {
  return (
    <li>I am a fake ingredient item!</li>
  )
  }
}