import config from '../config';

const RecipeApiService = {
  getRecipes() {
    return fetch(`http://localhost:8000/api/recipes`) //Headers for auth will go here; figure out the url!!
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    );
  }
  // getRecipe(recipeId) {
  //   return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)
  //   .then(res => {
  //     (!res.ok)
  //     ? res.json().then(e => Promise.reject(e))
  //     : res.json()
  //   })
  // }
}

export default RecipeApiService;