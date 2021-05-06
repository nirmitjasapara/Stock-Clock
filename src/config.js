export default {
  QUOTE_DATA_API_ENDPOINT: "https://api.twelvedata.com",
  COMPANY_DATA_API_ENDPOINT: "https://www.alphavantage.co",
  API_ENDPOINT: "https://stock-clock-server.herokuapp.com/api",
  NEWS_DATA_API_ENDPOINT: "https://finnhub.io/api/v1",
  API_KEY: process.env.REACT_APP_API_KEY,
  QUOTE_DATA_API_KEY: process.env.REACT_APP_TWELVEDATA_API_KEY,
  COMPANY_DATA_API_KEY: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
  NEWS_DATA_API_KEY: process.env.REACT_APP_FINNHUB_API_KEY,
  TOKEN_KEY: "auth-token"
};
