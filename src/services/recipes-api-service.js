import config from '../config';
import TokenService from './token-service';

const RecipesApiService = {
  getRecipes() {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  getUserData() {
    return fetch(`${config.API_ENDPOINT}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  getRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
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
  addRecipe(recipe, ingredients) {
    return fetch(`${config.API_ENDPOINT}/recipes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        recipe,
        ingredients
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

  updateRecipe(recipeId, newRecipeFields) {
    return fetch(`${config.API_ENDPOINT}/recipes/ingredients/${recipeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      body: JSON.stringify({
        recipeId,
        newRecipeFields
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