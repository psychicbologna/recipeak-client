import React, { Component } from 'react';

export const nullLiveInput = {
  value: null,
  touched: false,
}

export const nullRecipe = {
  name: nullLiveInput,
  author: nullLiveInput,
  prep_time_hours: nullLiveInput,
  prep_time_minutes: nullLiveInput,
  servings: nullLiveInput,
  instructions: nullLiveInput
}

export const nullIngredient = {
  amount: nullLiveInput,
  ing_text: nullLiveInput,
  unit_set: nullLiveInput,
  unit_singular: nullLiveInput,
  unit_plural: nullLiveInput
}

const RecipesFormContext = React.createContext({
  recipe: nullRecipe,
  ingredientCount: 0,
  ingredients: [],

  currentIngredient: nullIngredient,
  ingredientsAddList: [],
  ingredientsEditList: [],
  ingredientsDeleteList: [],

  setRecipe: () => { },
  setIngredients: () => { },
  clearRecipe: () => { },
  clearIngredients: () => { },

  updateRecipeField: () => { },
  updateIngredientField: () => { },
  handleSubmit: () => { },
  clearForm: () => { },

  addRecipe: () => { },
  removeRecipe: () => { },
  updateRecipe: () => { },

  addIngredient: () => { },
  editIngredient: () => { },
  deleteIngredient: () => { },
})

export default RecipesFormContext;

export class RecipesFormContextProvider extends Component {
  state = {
    //Recipe presets.
    recipe: nullRecipe,
    ingredientCount: 0,
    ingredients: [],
    //Track new ingredient
    currentIngredient: nullIngredient,
    //Track changes to all ingredients.
    ingredientsAddList: [],
    ingredientsEditList: [],
    ingredientsDeleteList: [],
  }

  //Update fields of recipe.
  updateRecipeField = (fieldName, value) => {
    this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        [fieldName]: { value: value, touched: true }
      }
    }));
    console.log(this.state.recipe[fieldName]);
  }

  //Update fields of ingredient
  updateIngredientField = (fieldName, value) => {
    this.setState(prevState => ({
      ingredient: {
        ...prevState.ingredient,
        [fieldName]: { value: value, touched: true }
      }
    }))
    console.log(this.state.currentIngredient[fieldName])
  }

  //Ingredient List manipulation

  //Add
  addIngredient = (ev, ingredient) => {
    ev.preventDefault();

    const newIngredient = {
      amount: ingredient.amount.value,
      ing_text: ingredient.ing_text.value,
      unit_set: ingredient.unit_set.value,
      unit_data: {
        unit_singular: ingredient.unit_singular.value,
        unit_plural: ingredient.unit_plural.value
      },
      tempId: this.state.ingredientCount + 1
    }

    let previewList = this.state.ingredients;
    let addList = this.state.addIngredientsList;
    let editList = this.state.editIngredientsList;
    let deleteList = this.state.deleteIngredientsList;

    let newList = [];

    //Start list if ingredient is first, add to start of preview array if next.
    if (!previewList) {
      newList = [newIngredient]
    } else {
      newList = [...previewList, newIngredient]
    }

    this.setState({ ingredients: newList })

    //Same for addIngredientsList
    if (!addList) {

    }


    this.setState({ igredientCount: this.state.ingredients.length + 1 })
    this.clearCurrentIngredient();
  }

  editIngredient() {

  }

  deleteIngredient = (event, id) => {
    const { ingredients } = this.state;
    console.log('remove firing')
    console.log(id)
    console.log(ingredients);

    event.preventDefault();

    const filteredIngredients = ingredients.filter(ingredient => ingredient.tempId !== id || ingredient.id !== id)

    console.log(filteredIngredients);

    this.setState({ ingredientCount: filteredIngredients.length })
    this.setState({ ingredients: filteredIngredients })

  }

  clearCurrentIngredient = () => {
    this.setState({ currentIngredient: nullIngredient })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set_select').value = 'none';
  }

  handleSubmit = (event, type) => {
    event.preventDefault();
    console.log(this.state);
    const { name, prep_time_hours, prep_time_minutes, servings, instructions } = this.state.recipe;

    if (type === 'add') {
      console.log('handleSubmit firing for add');
      console.log('Name: ', name.value);
      console.log('Prep Time: ', `${prep_time_hours.value} hours ${prep_time_minutes.value} minutes`);
      console.log('Servings: ', servings.value)
      console.log('Instructions: ', instructions.value)
    }

    if (type === 'edit') {
      console.log('handleSubmit firing for edit');
      console.log('Name: ', name.value);
      console.log('Prep Time: ', `${prep_time_hours.value} hours ${prep_time_minutes.value} minutes`);
      console.log('Servings: ', servings.value)
      console.log('Instructions: ', instructions.value)
    }
    //TODO set up submit API on both ends. nullify form values too?
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      recipe: nullRecipe,
      ingredientCount: 0,
      ingredients: [],
      currentIngredient: nullIngredient,
    })
  }

  //Returns amount to add to hours and minutes after adding those hours.
  adjustTime(minutes) {
    let hours, newMinutes;
    if (minutes > 60) {
      hours += Math.floor(minutes / 60)
      newMinutes = minutes - (hours * 60)
    }
    this.setState({
      prep_time_hours: this.state.prep_time_hours + hours,
      prep_time_minutes: newMinutes
    })
  }

  setRecipe = recipe => {
    const { name, author, prep_time, prep_time_hours, prep_time_minutes, servings, instructions } = recipe;

    this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        name: { value: name },
        author: { value: author },
        prep_time_hours: { value: prep_time_hours },
        prep_time_minutes: { value: prep_time_minutes },
        servings: { value: servings },
        instructions: { value: instructions }
      }
    }));
  };

  setIngredients = ingredients => {
    this.setState({ ingredients })
  }

  clearRecipe = () => {
    this.setRecipe(nullRecipe)
    this.setIngredients([])
  }

  toggleDeleteModal = () => {
    this.setState({
      deleteModalIsOpen: !this.state.deleteModalIsOpen
    });
  }

  render() {
    const value = {
      //State of inputs
      recipe: this.state.recipe,
      ingredientCount: this.state.ingredientCount,
      ingredients: this.state.ingredients,
      currentIngredient: this.state.currentIngredient,
      //Form fields
      updateRecipeField: this.updateRecipeField,
      updateIngredientField: this.updateIngredientField,
      //Form submit
      onSubmit: this.handleSubmit,
      //Form clear
      clearForm: this.clearForm,
      //Recipe Edit Preset
      setRecipe: this.setRecipe,
      setIngredients: this.setIngredients,
      clearRecipe: this.clearRecipe,
    };
    return (
      <RecipesFormContext.Provider value={value}>
        {this.props.children}
      </RecipesFormContext.Provider>
    )
  };

}