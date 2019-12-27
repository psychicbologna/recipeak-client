import config from '../config';
import TokenService from './token-service';

const RecipesApiService = {
  getRecipes() {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : undefined
    );
  },

  getRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  //TODO test endpoint in api, remove when sure it's working
  addRecipe(recipe, ingredientsAddList) {
    return fetch(`${config.API_ENDPOINT}/recipes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        recipe,
        ingredientsAddList
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  //TODO test endpoint in api, remove when sure it's working
  deleteRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  //TODO test endpoint in api, remove when sure it's working
  updateRecipe(recipeId, newRecipeFields, ingredientsAddList, ingredientsEditList, ingredientsDeleteList) {
    return fetch(`${config.API_ENDPOINT}/recipes/ingredients/${recipeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      body: JSON.stringify({
        recipeId,
        newRecipeFields,
        ingredientsAddList,
        ingredientsEditList,
        ingredientsDeleteList
      })
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

    //TODO test endpoint in api, remove when sure it's working
    getConversion(amount, unit_set) {
      return fetch(`${config.API_ENDPOINT}/conversion`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        body: JSON.stringify({
          amount,
          unit_set
        })
        }
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

  getRecipeIngredients(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}/ingredients/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}

export default RecipesApiService;