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

  ingredientsAddList: [],
  ingredientsEditList: [],
  ingredientsDeleteList: [],

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

  toggleDisableFieldsets: () => { }
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
  * @param {Object} newIngredient The new ingredient grabbed from 'currentIngredient' in state. 
  */
  updateIngredientListsWithAddition(ingredient) {
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
  * @param {Object} ingredientEdited The new ingredient grabbed from 'currentIngredient' in state. 
  */
  // updateIngredientListsWithEdit(event, ingredientEdited) {
  //   event.preventDefault();

  //   const displayList = this.state.ingredients;
  //   let newDisplayList = displayList.slice();

  //   const ingredientIndex = displayList.map((ingredient, index) => {
  //     if (ingredient.id === ingredientEdited.id) {
  //       return index
  //     } else {
  //       return null;
  //     }
  //   })

  //   if (!ingredientIndex.length) {
  //     console.log(`The ingredient you're trying to edit doesn't exist.`)
  //   } else if (ingredientIndex.length > 1) {
  //     console.log(`Something went wrong updating the list, please refresh and try again.`)
  //   } else {
  //     const findIndex = ingredientIndex[0];
  //     {
  //       newDisplayList[ingredientIndex[findIndex]] = ingredientEdited;
  //       this.setState({ ingredients: newDisplayList })

  //       //Remove any previous edits on this ingredient from queue if they exist to prevent unnecessary list bulk.
  //       const filteredEditList = this.state.ingredientsEditList.filter(ingredient => ingredient.id === ingredientEdited.id);
  //       this.setState({ ingredientsEditList: [...filteredEditList, ingredientEdited] })

  //       this.clearCurrentIngredient();
  //     }
  //   }
  // }
  //Syncs the lists on a delete.
  updateIngredientsListsWithDeletion = id => {
    //Generates copies of all change lists in state.
    const displayList = this.state.ingredients;
    const addList = [...this.state.ingredientsAddList];
    const editList = [...this.state.ingredientsEditList];
    const deleteList = [...this.state.ingredientsDeleteList];

    const filteredDisplayList = displayList.filter(ingredient => ingredient.id !== id)
    const filteredAddList = addList.filter(ingredient => ingredient.id !== id)
    const filteredEditList = editList.filter(ingredient => ingredient.id !== id)

    this.setState({ ingredients: filteredDisplayList })

    if (this.state.ingredientsAddList.find(ingredient => ingredient.id === id)) {
      this.setState({ ingredientsAddList: filteredAddList });
    } else if (this.state.ingredientsEditList.find(ingredient => ingredient.id === id)) {
      this.setState({ ingredientsEditList: filteredEditList });
    } else {
      this.setState({ ingredientsDeleteList: [...deleteList, id] })
    }
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
    if (ingredient.unit_set.value === 'custom') {
      newIngredient.unit_data = {
        unit_singular: ingredient.unit_singular.value,
        unit_plural: ingredient.unit_plural.value
      }
      this.updateIngredientListsWithAddition(newIngredient);
      return;
    } else {
      //Fetch unit set data and add to ingredient.
      UnitApiService.getUnitData(ingredient.unit_set.value)
        .then(unitData => {
          newIngredient.unit_data = {
            class: unitData.class,
            unit_plural: unitData.unit_plural,
            unit_single: unitData.unit_single
          };
          //Generates and attaches conversion
          if (unitData.class === 'Metric' || unitData.class === 'US') {
            ConversionService.getConversion(newIngredient.amount, newIngredient.unit_set)
              .then(conversion => {
                newIngredient.conversion = conversion;
                this.updateIngredientListsWithAddition(newIngredient);
                return;
              })
          } else {
            this.updateIngredientListsWithAddition(newIngredient);
            return;
          }
        })
    }
  }


  //Prep data for submission

  filterIngredientsAddList = ingredients => {
    return ingredients.map(ingredient => {
      const newIngredient = {
        amount: ingredient.amount,
        unit_set: ingredient.unit_set,
        ing_text: ingredient.ing_text
      };

      if (ingredient.unit_set === 'custom') {
        newIngredient.unit_data = ingredient.unit_data;
      }
      return newIngredient;
    })
  }

  //Add ingredient to preview list and queue for addition
  handleEditIngredient = (editedIngredient) => {
    const newIngredient = {
      id: editedIngredient.id,
      amount: editedIngredient.amount.value,
      ing_text: editedIngredient.ing_text.value,
      unit_set: editedIngredient.unit_set.value,
    }
    console.log(editedIngredient);

    if (editedIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_single: editedIngredient.unit_single.value,
        unit_plural: editedIngredient.unit_plural.value
      }
    }

    //Add unit data if custom unit and/or set if unit set.
    if (newIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_singular: editedIngredient.unit_singular.value,
        unit_plural: editedIngredient.unit_plural.value
      };
    } else {
      //Fetch unit set data and add to ingredient, as well as conversion.
      UnitApiService.getUnitData(newIngredient.unit_set)
        .then(unitData => {
          newIngredient.class = unitData.class;
          newIngredient.unit_plural = unitData.unit_plural;
          newIngredient.unit_single = unitData.unit_single;
          //Generates and attaches conversion
          if (unitData.class === 'Metric' || unitData.class === 'US') {
            ConversionService.getConversion(newIngredient.amount, newIngredient.unit_set)
              .then(conversion => {
                newIngredient.conversion = conversion;
              })
          }
        })
    }

    console.log('New Ingredient: ', newIngredient);

    //Copy lists
    const displayList = this.state.ingredients;
    const addList = [...this.state.ingredientsAddList];
    const editList = [...this.state.ingredientsEditList];

    const index = displayList.findIndex(i => {
      return i.id === editedIngredient.id
    })

    displayList[index] = newIngredient;

    this.setState({ ingredients: displayList })

    console.log('State after adding: ', this.state.ingredients[index])

    const indexAddList = addList.findIndex(i => {
      return i.id === editedIngredient.id
    })

    displayList[indexAddList] = newIngredient;

    this.setState({ ingredientsAddList: addList })

    const indexEditList = editList.findIndex(i => {
      return i.id === editedIngredient.id
    })

    displayList[indexEditList] = newIngredient;

    return this.setState({ ingredientsEditList: editList })
  }

  handleDeleteIngredient = (ingredientId) => {
    this.updateIngredientsListsWithDeletion(ingredientId);
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
      ingredientsAddList: [...ingredientsAddList],
      ingredientsEditList: [...ingredientsEditList],
      ingredientsDeleteList: [...ingredientsDeleteList]
    }

    //Pulls temporary id from new ingredients.
    newRecipe.ingredientsAddList = this.filterIngredientsAddList(newRecipe.ingredientsAddList);

    if (!id) {
      delete newRecipe.ingredientsEditList;
      delete newRecipe.ingredientsDeleteList;
      return this.addRecipe(newRecipe)
        .then(id => {
          return id;
        })
    } else if (!!id) {
      newRecipe.id = id;
      return this.editRecipe(newRecipe)
    }
  }

  addRecipe = async recipe => {
    const id = await RecipesApiService.postRecipe(recipe)
    return Promise.resolve(id)
  }

  updateRecipe = recipe => {
    //TODO send recipe and all ingredient lists, flush current recipe form and load recipe view page. OnSuccess handler should prevent premature flush.
    console.log('updateRecipe firing!')
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

  //Deletes the current recipe.
  //TODO should send you to home as well. OnSuccess handler.
  deleteRecipe(recipeId) {
    RecipesApiService.deleteRecipe(recipeId)
      .then(() => this.clearRecipe());
  }

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

  render() {
    const value = {
      //State of inputs
      recipe: this.state.recipe,
      ingredientCount: this.state.ingredientCount,
      ingredients: this.state.ingredients,
      //State of fields
      disableFieldsets: this.state.disableFieldsets,
      //Ingredient lists
      ingredientsAddList: this.state.ingredientsAddList,
      ingredientsEditList: this.state.ingredientsEditList,
      ingredientsDeleteList: this.state.ingredientsDeleteList,
      //Tracking values
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
    };
    return (
      <RecipeFormContext.Provider value={value}>
        {this.props.children}
      </RecipeFormContext.Provider>
    )
  };

}