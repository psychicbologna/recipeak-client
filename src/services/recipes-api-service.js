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

  getUserRecipes(username) {
    return fetch(`${config.API_ENDPOINT}/home/${username}`, {
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

  deleteRecipeIngredients(ingredientId) {
    return fetch(`${config.API_ENDPOINT}/recipes/ingredients/${ingredientId}`, {
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

export default RecipeApiService;