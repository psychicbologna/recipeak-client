import config from '../config';

const ConversionApiService = {
  //Retrieve conversion for new/edited ingredients
  getConversion(amount, unit_set) {
    return fetch(`${config.API_ENDPOINT}/convert/${amount}/${unit_set}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
};

export default ConversionApiService;