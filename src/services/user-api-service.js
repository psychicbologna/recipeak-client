import config from '../config';
import TokenService from './token-service';

const UserApiService = {

  //Retrieves user data, including recipes.
  getUserData() {
    return fetch(`${config.API_ENDPOINT}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .catch(error => {
        console.log('Error:', error.error)
      })
  }
}

export default UserApiService;