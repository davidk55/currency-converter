import axios from 'axios';

const BASE_URL = 'https://api.vatcomply.com';

class CurrencyService {
  async getLatestRates() {
    return axios
      .get(`${BASE_URL}/rates`)
      .then((response) => response.data.rates)
      .catch((error) => console.log(error));
  }

  async getCurrencies() {
    return axios
      .get(`${BASE_URL}/currencies`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
}

export default new CurrencyService();
