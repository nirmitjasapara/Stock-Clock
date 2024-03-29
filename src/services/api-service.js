import TokenService from "../services/token-service";
import config from "../config";

const ApiService = {
  /**
   * Fetches real time stock prices from the server.
   * @input a list of symbols
   */
  getQuotes(companies) {
    const symbolstring = companies.map(company => company.symbol).join();
    const number_of_companies = companies.length;
    const url = `${config.QUOTE_DATA_API_ENDPOINT}/quote?symbol=${symbolstring}&apikey=${config.QUOTE_DATA_API_KEY}`;
    return fetch(url, {
      headers: {}
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json => {
        return number_of_companies > 1 ? Object.values(json) : [json];
      })
      .then(json => {
        console.log(json);
        return json;
      });
  },
  getCompanyData(symbol) {
    const url = `${config.COMPANY_DATA_API_ENDPOINT}/query?function=OVERVIEW&symbol=${symbol}&apikey=${config.COMPANY_DATA_API_KEY}`;
    return fetch(url, {
      headers: {}
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json => {
        console.log(json);
        return json;
      });
  },
  getTimingData(symbol) {
    const url = `${config.COMPANY_DATA_API_ENDPOINT}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${config.COMPANY_DATA_API_KEY}`;
    return fetch(url, {
      headers: {}
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json => {
        console.log(json);
        return json;
      });
  },
  getNewsData(symbol, start, end) {
    const url = `${config.NEWS_DATA_API_ENDPOINT}/company-news?symbol=${symbol}&from=${start}&to=${end}&token=${config.NEWS_DATA_API_KEY}`;
    return fetch(url, {
      headers: {}
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json => {
        console.log(json);
        return json;
      });
  },
  fillCompanyList() {
    const url = `https://api.iextrading.com/1.0/ref-data/symbols`;
    console.log(url);
    return fetch(url, {
      headers: {}
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json => {
        console.log(json);
        return json;
      });
  },
  getFollowings() {
    return fetch(`${config.API_ENDPOINT}/stocks`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json => {
        console.log(json);
        return json;
      });
  },
  follow({ symbol }) {
    return fetch(`${config.API_ENDPOINT}/stocks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        symbol
      })
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  unfollow(id) {
    return fetch(`${config.API_ENDPOINT}/stocks/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default ApiService;
