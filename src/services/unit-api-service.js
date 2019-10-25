//TODO finish api call to retrieve units

import config from '../config';

const UnitApiService = {
  getUnits() {
    return fetch(`${config.API_ENDPOINT}/units`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  }
};

export default UnitApiService;