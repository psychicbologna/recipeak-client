//TODO finish api call to retrieve units

import config from '../config';

const UnitService = {
  getUnits() {
    return fetch(`${config.API_ENDPOINT}/units`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
};

export default UnitService;