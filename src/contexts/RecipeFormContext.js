import React, { Component } from 'react';
import RecipesApiService from '../services/recipes-api-service';
import UnitApiService from '../services/unit-api-service';
import ConversionService from '../services/conversion-api-service';
import uuidv1 from 'uuid/v1';

export const nullLiveInput = {
  value: null,
  touched: false,
}

export const nullRecipe = {
  id: '',
  name: nullLiveInput,
  author: nullLiveInput,
  prep_time_hours: nullLiveInput,
  prep_time_minutes: nullLiveInput,
  servings: nullLiveInput,
  instructions: nullLiveInput
}

export const nullIngredient = {
  id: '',
  amount: '',
  ing_text: '',
  unit_set: 'none',
  unit_single: '',
  unit_plural: '',
}

const RecipeFormContext = React.createContext({
  recipe: nullRecipe,
  ingredientCount: 0,
  ingredients: [],

  disableFieldsets: false,

  setRecipe: () => { },
  setIngredients: () => { },
  updateRecipeField: () => { },

  clearRecipe: () => { },
  clearIngredients: () => { },
  clearForm: () => { },
  onFormSubmit: () => { },

  addRecipe: () => { },
  updateRecipe: () => { },
  deleteRecipe: () => { },

  onAddIngredient: () => { },
  onEditIngredient: () => { },
  onDeleteIngredient: () => { },

  toggleDisableFieldsets: () => { },
  enableFieldsets: () => { }
})

export default RecipeFormContext;

// Controls and collects all the changes made to a recipe and its ingredients, as well as some features of its display.

export class RecipeFormContextProvider extends Component {
  state = {
    //Recipe presets.
    recipe: nullRecipe,
    ingredientCount: 0,
    ingredients: [],
    //Track changes to all ingredients.
    ingredientsAddList: [],
    ingredientsEditList: [],
    ingredientsDeleteList: [],
    //Disables all fieldsets when true.
    disableFieldsets: false,
    //Prevents submit when true.
    disableSubmit: false
  }

  //Update fields of recipe other than ingredients.
  updateRecipeField = (fieldName, value) => {
    this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        [fieldName]: { value, touched: true }
      }
    }));
  }

  /**
  * @param {Object} newIngredient The new ingredient, processed. 
  */
  updateIngredientListsWithAddition = (ingredient) => {
    const displayList = this.state.ingredients;
    let newDisplayList = displayList.slice();
    ingredient.added = true;
    //Add to list.
    newDisplayList = [...displayList, ingredient]
    //Overwrite displayed list and add list with new value.
    this.setState({ ingredients: newDisplayList, })
    this.setState({
      ingredientsAddList: [...this.state.ingredientsAddList, ingredient],
    })
  }

  /**
  * @param {Object} ingredientEdited The edited ingredient, processed. 
  */
  updateIngredientListsWithEdit = (newIngredient, editedIngredient) => {
    const displayList = [...this.state.ingredients];
    const addList = [...this.state.ingredientsAddList];
    const editList = [...this.state.ingredientsEditList];

    //Change ingredient on display list.
    let index = displayList.findIndex(i => i.id === editedIngredient.id)
    if (index > -1) {
      displayList[index] = newIngredient;
      this.setState({ ingredients: displayList })
    }

    //If ingredient is on add list, change it;
    // else if it's already on edit list, change that edit;
    // else add it to edit list.
    index = addList.findIndex(i => i.id === editedIngredient.id)
    if (index > -1) {
      addList[index] = newIngredient;
      this.setState({ ingredientsAddList: addList })
    } else {
      index = editList.findIndex(i => i.id === editedIngredient.id)
      if (index > -1) {
        editList[index] = newIngredient;
        this.setState({ ingredientsEditList: editList })
      } else {
        editList.push(newIngredient)
        this.setState({ ingredientsEditList: editList })
      }
    }
  }

  //Fetch unit set data add to ingredient, as well as conversion if necessary
  retrieveUnitData = (newIngredient) => {
    return UnitApiService.getUnitData(newIngredient.unit_set)
      .then(unitData => {
        newIngredient.unit_data = {
          class: unitData.class,
          unit_plural: unitData.unit_plural,
          unit_single: unitData.unit_single
        };
        return unitData
      })
      .then(unitData => {
        //Generates and attaches conversion
        if (unitData.class === 'Metric' || unitData.class === 'US') {
          return ConversionService.getConversion(newIngredient.amount, newIngredient.unit_set)
            .then(conversion => {
              return newIngredient.conversion = conversion;
            })
        }
      })
  }

  //Add ingredient to preview list and queue for addition
  handleAddIngredient = (ingredient) => {
    //Create new ingredient
    const newIngredient = {
      //Flag with temporary id, this allows new ingredients to mingle with old on the display.
      id: `temp-${uuidv1()}`,
      //TODO move this parse and other logic to form validation?
      amount: parseFloat(ingredient.amount.value),
      unit_set: ingredient.unit_set.value,
      ing_text: ingredient.ing_text.value,
    }

    //Add unit data if custom unit and/or set if unit set.
    if (newIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_single: ingredient.custom_single.value,
        unit_plural: ingredient.custom_plural.value
      };
      return this.updateIngredientListsWithAddition(newIngredient, ingredient)
    } else {
      return this.retrieveUnitData(newIngredient)
        .then(() => {
          return this.updateIngredientListsWithAddition(newIngredient, ingredient)
        })
    }
  }

  //Add ingredient to preview list and queue for addition
  handleEditIngredient = (editedIngredient) => {
    const newIngredient = {
      id: editedIngredient.id,
      amount: parseFloat(editedIngredient.amount.value),
      ing_text: editedIngredient.ing_text.value,
      unit_set: editedIngredient.unit_set.value,
    }

    //Add unit data if custom unit and/or set if unit set.
    if (newIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_single: editedIngredient.custom_single.value,
        unit_plural: editedIngredient.custom_plural.value
      };
      return this.updateIngredientsListsWithEdit(newIngredient, editedIngredient)
    } else {
      return this.retrieveUnitData(newIngredient)
        .then(() => {
          return this.updateIngredientListsWithEdit(newIngredient, editedIngredient)
        })
    }
  }

  handleDeleteIngredient = (id) => {
    //Generates copies of all change lists in state.
    const displayList = [...this.state.ingredients];
    const addList = [...this.state.ingredientsAddList];
    const editList = [...this.state.ingredientsEditList];
    const deleteList = [...this.state.ingredientsDeleteList]; //List of items to delete from database.


    //Remove from ingredient display
    const filteredDisplayList = displayList.filter(ingredient => ingredient.id !== id)
    this.setState({ ingredients: filteredDisplayList })

    const addListHasIngredient = addList.find(ingredient => ingredient.id === id)
    const editListHasIngredient = editList.find(ingredient => ingredient.id === id)

    if (addListHasIngredient) {
      const filteredAddList = addList.filter(ingredient => ingredient.id !== id)
      this.setState({ ingredientsAddList: filteredAddList });
    } else if (editListHasIngredient) {
      const filteredEditList = editList.filter(ingredient => ingredient.id !== id)
      this.setState({ ingredientsEditList: filteredEditList });
      //Because edit list only includes items that exist in the database,
      // we must also slate it for deletion on the backend delete list.
      this.setState({ ingredientsDeleteList: [...deleteList, id] });
    } else {
      this.setState({ ingredientsDeleteList: [...deleteList, id] })
    }
  }

  //Submits the recipe and its ingredients.
  handleFormSubmit = () => {

    const { id, name, author, prep_time_hours, prep_time_minutes, servings, instructions } = this.state.recipe;
    const { ingredientsAddList, ingredientsEditList, ingredientsDeleteList } = this.state

    //Set up recipe for post
    const newRecipe = {
      name: name.value,
      author: author.value,
      prep_time_hours: prep_time_hours.value,
      prep_time_minutes: prep_time_minutes.value,
      servings: servings.value,
      instructions: instructions.value,
      ingredients: {
        ingredientsAddList: [...ingredientsAddList],
        ingredientsEditList: [...ingredientsEditList],
        ingredientsDeleteList: [...ingredientsDeleteList]
      }
    }

    if (!id) {
      delete newRecipe.ingredients.ingredientsEditList;
      delete newRecipe.ingredients.ingredientsDeleteList;
      return this.addRecipe(newRecipe)
        .then(id => {
          return id;
        })
    } else if (!!id) {
      newRecipe.id = id;
      return this.updateRecipe(newRecipe, id)
        .then(id => {
          return id;
        })
    }
  }

  addRecipe = async recipe => {
    const id = await RecipesApiService.postRecipe(recipe)
    return Promise.resolve(id)
  }

  updateRecipe = async (recipe, id) => {
    const successId = await RecipesApiService.updateRecipe(recipe, id)
    return Promise.resolve(successId)
  }

  //Flushes all of the form's state, including all ingredients.
  clearForm = () => {
    this.setState({
      recipe: nullRecipe,
      ingredientCount: 0,
      ingredients: [],
      ingredientsAddList: [],
      ingredientsDeleteList: [],
      ingredientsEditList: [],
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
    const { id, name, author, prep_time_hours, prep_time_minutes, servings, instructions } = recipe;

    this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        id: id,
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

  //Flushes all recipe data, but not ingredients.
  clearRecipe = () => {
    this.setRecipe(nullRecipe)
    this.setIngredients([])
  }

  toggleDisableFieldsets = () => {
    this.setState({ disableFieldsets: !this.state.disableFieldsets })
  }

  enableFieldsets = () => {
    this.setState({ disableFieldsets: false })
  }

  render() {
    const value = {
      //State of inputs
      recipe: this.state.recipe,
      ingredientCount: this.state.ingredientCount,
      ingredients: this.state.ingredients,
      //State of fields
      disableFieldsets: this.state.disableFieldsets,
      setRecipe: this.setRecipe,
      setIngredients: this.setIngredients,
      updateRecipeField: this.updateRecipeField,
      clearRecipe: this.clearRecipe,
      clearIngredients: this.clearIngredients,
      clearForm: this.clearForm,
      onFormSubmit: this.handleFormSubmit,

      onAddIngredient: this.handleAddIngredient,
      onEditIngredient: this.handleEditIngredient,
      onDeleteIngredient: this.handleDeleteIngredient,

      toggleDisableFieldsets: this.toggleDisableFieldsets,
      enableFieldsets: this.enableFieldsets
    };
    return (
      <RecipeFormContext.Provider value={value}>
        {this.props.children}
      </RecipeFormContext.Provider>
    )
  };

}