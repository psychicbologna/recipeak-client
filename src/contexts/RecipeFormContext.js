import React, { Component } from 'react';
import RecipesApiService from '../services/recipes-api-service';
import uuidv1 from 'uuid/v1';

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
  unit_single: nullLiveInput,
  unit_plural: nullLiveInput,
  unit_data: {
    unit_single: nullLiveInput,
    unit_plural: nullLiveInput
  }
}

const RecipeFormContext = React.createContext({
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
  deleteRecipe: () => { },
  updateRecipe: () => { },

  handleAddIngredient: () => { },
  handleEditIngredient: () => { },
  handleDeleteIngredient: () => { },
})

export default RecipeFormContext;

export class RecipeFormContextProvider extends Component {
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

  //Update fields of recipe other than ingredients.
  updateRecipeField = (fieldName, value) => {
    this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        [fieldName]: { value: value, touched: true }
      }
    }));
  }

  //Update fields of ingredient
  updateIngredientField = (fieldName, value) => {
    this.setState(prevState => ({
      currentIngredient: {
        ...prevState.currentIngredient,
        [fieldName]: { value: value, touched: true }
      }
    }))
  }

  //Ingredient List manipulation. These do not affect database until the whole form is submitted.

  /**
  * @param {Object} newIngredient The new ingredient grabbed from 'currentIngredient' in state. 
  */
  updateIngredientListsWithAddition(newIngredient) {

    const displayList = this.state.ingredients;
    let newDisplayList = displayList.slice();

    //Flag with temporary id, this allows new ingredients to mingle with old on the display.
    newIngredient.id = `temp-${uuidv1()}`

    //Add to list.
    newDisplayList = [...displayList, newIngredient]

    //Overwrite displayed list
    this.setState({ ingredients: newDisplayList, })

    //Remove temporary id from data before placing on add list to ensure database generates id.
    delete newIngredient.id;

    this.setState({
      ingredientsAddList: [...this.state.ingredientsAddList, newIngredient],
    })
    this.clearCurrentIngredient();
  }


  //TODO if the list fails, retrieve initial list from database as fallback?
  //TODO ensure the id for newly added ingredients is removed in a filter function when the form is submitted.


  /**
  * @param {Object} ingredientEdited The new ingredient grabbed from 'currentIngredient' in state. 
  */
  updateIngredientListsWithEdit(event, ingredientEdited) {
    event.preventDefault();

    const displayList = this.state.ingredients;
    let newDisplayList = displayList.slice();

    const ingredientIndex = displayList.map((ingredient, index) => {
      if (ingredient.id === ingredientEdited.id) {
        return index
      }
    })

    if (!ingredientIndex.length) {
      console.log(`The ingredient you're trying to edit doesn't exist.`)
    } else if (ingredientIndex.length > 1) {
      console.log(`Something went wrong updating the list, please refresh and try again.`)
    } else {
      const findIndex = ingredientIndex[0];
      {
        newDisplayList[ingredientIndex[findIndex]] = ingredientEdited;
        this.setState({ ingredients: newDisplayList })

        //Remove any previous edits on this ingredient from queue if they exist to prevent unnecessary list bulk.
        const filteredEditList = this.state.ingredientsEditList.filter(ingredient => ingredient.id === ingredientEdited.id);
        this.setState({ ingredientsEditList: [...filteredEditList, ingredientEdited] })
        this.clearCurrentIngredient();
      }
    }
  }
  //Update the preview ingredient list with deletion after clicking delete on ingredient in list - used in Ingredient.js.
  updateIngredientsListsWithDeletion = (event, id) => {
    event.preventDefault();
    const displayList = this.state.ingredients;

    const filteredDeletedIngredients = displayList.filter(ingredient => ingredient.id !== id)

    this.setState({ ingredientsDeleteList: [...this.state.ingredientsDeleteList, id] })
    this.setState({ ingredients: filteredDeletedIngredients })

  }


  //Add ingredient to preview list and queue for addition
  handleAddIngredient = (event, currentIngredient) => {

    const newIngredient = {
      amount: currentIngredient.amount.value,
      ing_text: currentIngredient.ing_text.value,
      unit_set: currentIngredient.unit_set.value
    }

    //Add unit data if custom unit.
    if (currentIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_singular: currentIngredient.unit_singular.value,
        unit_plural: currentIngredient.unit_plural.value
      }

      this.updateIngredientListWithAddition(newIngredient)
    }
  }

  //Add ingredient to preview list and queue for addition
  handleEditIngredient = (currentIngredient) => {

    const newIngredient = {
      id: currentIngredient.id,
      amount: currentIngredient.amount.value,
      ing_text: currentIngredient.ing_text.value,
      unit_set: currentIngredient.unit_set.value,
    }

    if (currentIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_singular: currentIngredient.unit_singular.value,
        unit_plural: currentIngredient.unit_plural.value
      }

      this.updateIngredientListWithAddition(newIngredient)
    }
  }

  clearCurrentIngredient = () => {
    this.setState({ currentIngredient: nullIngredient })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set_select').value = 'none';
  }

  handleSubmit = (event, type) => {
    event.preventDefault();
    const { name, prep_time_hours, prep_time_minutes, servings, instructions } = this.state.recipe;
    const { ingredients, ingredientsAddList, ingredientsEditList, ingredientsDeleteList } = this.state

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
      console.log('Ingredients added: ', ingredientsAddList);
      console.log('Ingredients edited: ', ingredientsEditList);
      console.log('Ingredients deleted: ', ingredientsDeleteList);

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
    const { name, author, prep_time_hours, prep_time_minutes, servings, instructions } = recipe;

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

  updateRecipe() {
    console.log('updateRecipe firing!')
  }

  deleteRecipe(recipeId) {
    RecipesApiService.deleteRecipe(recipeId)
  }

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

      setRecipe: this.setRecipe,
      addRecipe: this.addRecipe,
      updateRecipe: this.deleteRecipe,
      deleteRecipe: this.deleteRecipe,

      setIngredients: this.setIngredients,
      onAddIngredient: this.handleAddIngredient,
      onEditIngredient: this.handleEditIngredient,
      onDeleteIngredient: this.handleDeleteIngredient,

      clearRecipe: this.clearRecipe,
    };
    return (
      <RecipeFormContext.Provider value={value}>
        {this.props.children}
      </RecipeFormContext.Provider>
    )
  };

}