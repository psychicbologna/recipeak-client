import config from '../config';
import TokenService from './token-service';

const RecipeApiService = {
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
    console.log(TokenService.getAuthToken());
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

  //TODO construct endpoint in API
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

  //TODO construct endpoint in API
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

  //TODO construct endpoint in API
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

    //TODO construct endpoint in API
  addIngredient(recipeId, ingredient) {
      return fetch(`${config.API_ENDPOINT}/recipes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
          recipeId,
          ingredient
        })
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

  //TODO construct endpoint in API
  deleteRecipeIngredients(ingredientId) {
    return fetch(`${config.API_ENDPOINT}/recipes/ingredients/${ingredientId}`, {
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

  //TODO construct endpoint in API
  updateRecipeIngredients(ingredientId, recipeId, newIngredientFields) {
    return fetch(`${config.API_ENDPOINT}/recipes/ingredients/${ingredientId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      body: JSON.stringify({
        recipeId,
        newIngredientFields
      })
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },


}

export default RecipeApiService;