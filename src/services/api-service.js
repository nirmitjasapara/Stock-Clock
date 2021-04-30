import TokenService from '../services/token-service'
import config from '../config'

const ApiService = {
  getCompanyData(symbol) {
    const url = `${config.COMPANY_DATA_API_ENDPOINT}/query?function=OVERVIEW&symbol=${symbol}&apikey=${config.COMPANY_DATA_API_KEY}`;
    console.log(url);
    return fetch(url, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(json => {
        console.log(json);
        return json;
      })
  },
  getTimingData(symbol) {
    const url = `${config.COMPANY_DATA_API_ENDPOINT}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${config.COMPANY_DATA_API_KEY}`;
    console.log(url);
    return fetch(url, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  fillCompanyList() {
    const url = `https://api.iextrading.com/1.0/ref-data/symbols`;
    console.log(url);
    return fetch(url, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getFollowings() {
    return fetch(`${config.API_ENDPOINT}/stocks`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  follow({ symbol }) {
    return fetch(`${config.API_ENDPOINT}/stocks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        symbol,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  unfollow({ symbol }) {
    return fetch(`${config.API_ENDPOINT}/stocks/${symbol}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ApiService