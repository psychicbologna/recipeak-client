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
  amount: nullLiveInput,
  ing_text: nullLiveInput,
  unit_set: nullLiveInput,
  unit_single: '',
  unit_plural: '',
}

const RecipeFormContext = React.createContext({
  recipe: nullRecipe,
  ingredientCount: 0,
  ingredients: [],

  currentIngredient: nullIngredient,
  ingredientsAddList: [],
  ingredientsEditList: [],
  ingredientsDeleteList: [],

  disableFieldsets: false,

  setRecipe: () => { },
  setIngredients: () => { },
  setCurrentIngredient: () => { },

  updateRecipeField: () => { },
  updateIngredientField: () => { },

  clearRecipe: () => { },
  clearIngredients: () => { },
  clearCurrentIngredient: () => { },
  clearForm: () => { },
  handleSubmit: () => { },

  addRecipe: () => { },
  updateRecipe: () => { },
  deleteRecipe: () => { },

  onAddIngredient: () => { },
  onEditIngredient: () => { },
  onDeleteIngredient: () => { },

  toggleDisableFieldsets: () => { }
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

  //Update fields of current ingredient
  updateIngredientField = (fieldName, value) => {
    this.setState(prevState => ({
      currentIngredient: {
        ...prevState.currentIngredient,
        [fieldName]: { value, touched: true }
      }
    }))
  }

  //Ingredient List manipulation. These do not affect database until the whole form is submitted.

  getUnitData = unit_set => {
    return UnitApiService.getUnitData(unit_set)
      .then(unitData => {
        const unit_single = unitData.unit_single;
        const unit_plural = unitData.unit_plural;
        return { unit_single, unit_plural }
      });
  }

  setUnitData = (ingredient, unitDataFields) => {
    let hasUnits = unitDataFields.includes('unit_single') && unitDataFields.includes('unit_plural')
    let unitData = {
      unit_single: '',
      unit_plural: ''
    };

    if (ingredient.unit_set === 'custom' && hasUnits) {
      //TODO must submit both single and plural unit, validate!
      unitData.unit_single = ingredient.unit_data.unit_single;
      unitData.unit_plural = ingredient.unit_data.unit_plural;
      return unitData;
    } else if (ingredient.unit_set === 'custom' && !hasUnits) {
      return unitData;
    } else {
      return this.getUnitData(ingredient.unit_set)
        .then(unitDataFromSet => {
          console.log(unitDataFromSet);
          return unitDataFromSet;
        })
    }
  }

  //Set current ingredient from list when edit is clicked.
  setCurrentIngredient = (ingredient) => {

    let newCurrentIngredient = nullIngredient;
    const newFields = Object.keys(ingredient);
    const unitDataFields = Object.keys(ingredient.unit_data);

    //Convert key values to currentIngredient values.
    for (let i = 0; i < newFields.length; i++) {
      let field = newFields[i];

      if (field === 'id') {
        newCurrentIngredient[field] = ingredient[field]
      } else if (field === 'unit_data') {
        continue;
      } else {
        newCurrentIngredient[field] = { value: ingredient[field], touched: false }
      }
    }

    const unitData = this.setUnitData(ingredient, unitDataFields);

    return unitData.then(unitData => {
      console.log(unitData);
      newCurrentIngredient.unit_single = unitData.unit_single;
      newCurrentIngredient.unit_plural = unitData.unit_plural;
      this.setState({ currentIngredient: newCurrentIngredient })
      return newCurrentIngredient;
    });

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
        console.log(this.context.ingredientsEditList);

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
  handleAddIngredient = (currentIngredient) => {
    //Create new ingredient
    const newIngredient = {
      //Flag with temporary id, this allows new ingredients to mingle with old on the display.
      id: `temp-${uuidv1()}`,
      //TODO move this parse and other logic to form validation?
      amount: parseFloat(currentIngredient.amount.value),
      unit_set: currentIngredient.unit_set.value,
      ing_text: currentIngredient.ing_text.value,
    }

    //Add unit data if custom unit and/or set if unit set.
    if (currentIngredient.unit_set === 'custom') {
      newIngredient.unit_data = {
        unit_singular: currentIngredient.unit_singular.value,
        unit_plural: currentIngredient.unit_plural.value
      }
      this.updateIngredientListsWithAddition(newIngredient);
      this.clearCurrentIngredient();
    } else {
      //Fetch unit set data and add to ingredient.
      UnitApiService.getUnitData(currentIngredient.unit_set.value)
        .then(unitData => {
          console.log(unitData);
          newIngredient.unit_data = {
            class: unitData.class,
            unit_plural: unitData.unit_plural,
            unit_single: unitData.unit_single
          };

          if (unitData.class === 'Metric' || unitData.class === 'US') {
            ConversionService.getConversion(newIngredient.amount, newIngredient.unit_set)
              .then(conversion => {
                console.log('Conversion: ', conversion)
                newIngredient.conversion = conversion;
                this.updateIngredientListsWithAddition(newIngredient);
                this.clearCurrentIngredient();
              })
          } else {
            this.updateIngredientListsWithAddition(newIngredient);
            this.clearCurrentIngredient();
            console.log(this.state.ingredientsAddList)
          }
        })
    }
  }

  //Add ingredient to preview list and queue for addition
  handleEditIngredient = (currentIngredient) => {
    console.log('editIngredient firing!')
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
    console.log('Edit List: ', this.state.ingredientsEditList);
  }

  clearCurrentIngredient = () => {
    console.log('clearCurrentIngredient firing')
    this.setState({ currentIngredient: nullIngredient })
    console.log(this.state.currentIngredient);
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set').value = 'none';
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

  handleSubmit = (event, type) => {
    event.preventDefault();
    const { name, prep_time_hours, prep_time_minutes, servings, instructions } = this.state.recipe;
    const { ingredients, ingredientsAddList, ingredientsEditList, ingredientsDeleteList } = this.state

    const add = this.filterIngredientsAddList(ingredientsAddList);

    if (type === 'add') {
      console.log('handleSubmit firing for add');
      console.log('Name: ', name.value);
      console.log('Prep Time: ', `${prep_time_hours.value} hours ${prep_time_minutes.value} minutes`);
      console.log('Servings: ', servings.value)
      console.log('Instructions: ', instructions.value)
      console.log('Ingredients added: ', add);
      console.log('Ingredients edited: ', ingredientsEditList);
      console.log('Ingredients deleted: ', ingredientsDeleteList);
    }

    if (type === 'edit') {
      console.log('handleSubmit firing for edit');
      console.log('Name: ', name.value);
      console.log('Prep Time: ', `${prep_time_hours.value} hours ${prep_time_minutes.value} minutes`);
      console.log('Servings: ', servings.value)
      console.log('Instructions: ', instructions.value)
      console.log('Ingredients added: ', add);
      console.log('Ingredients add list: ', ingredientsAddList);
      console.log('Ingredients edited: ', ingredientsEditList);
      console.log('Ingredients deleted: ', ingredientsDeleteList);

    }
    //TODO set up submit API on both ends. nullify form values too?
    this.clearForm();
    this.render();
  }

  clearForm = () => {
    this.setState({
      recipe: nullRecipe,
      ingredientCount: 0,
      ingredients: [],
      ingredientsAddList: [],
      ingredientsDeleteList: [],
      ingredientsEditList: [],
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
      .then(() => this.clearRecipe());
  }

  setIngredients = ingredients => {
    this.setState({ ingredients })
  }

  clearRecipe = () => {
    this.setRecipe(nullRecipe)
    this.setIngredients([])
  }

  toggleDeleteModal = () => {
    this.setState({ deleteModalIsOpen: !this.state.deleteModalIsOpen });
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
      currentIngredient: this.state.currentIngredient,
      //State of fields
      disableFieldsets: this.state.disableFieldsets,
      //Ingredient lists
      ingredientsAddList: this.state.ingredientsAddList,
      ingredientsEditList: this.state.ingredientsEditList,
      ingredientsDeleteList: this.state.ingredientsDeleteList,
      //Tracking values
      setRecipe: this.setRecipe,
      setIngredients: this.setIngredients,
      setCurrentIngredient: this.setCurrentIngredient,
      updateRecipeField: this.updateRecipeField,
      updateIngredientField: this.updateIngredientField,
      clearRecipe: this.clearRecipe,
      clearIngredients: this.clearIngredients,
      clearCurrentIngredient: this.clearCurrentIngredient,
      clearForm: this.clearForm,
      onSubmit: this.handleSubmit,

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