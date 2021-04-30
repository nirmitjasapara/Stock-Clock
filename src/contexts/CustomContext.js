import React, { Component } from 'react'

const CustomContext = React.createContext({
  followings: [],
  companyref: [],
  cache: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setCompanyRef: () => {},
  clearCompanyRef: () => {},
  setFollowings: () => {},
  addFollowing: () => {},
  clearFollowings: () => {},
  getCompany: () => {},
  cacheCompany: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    followings: [],
    companyref: [],
    cache: [],
    error: null
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }
  setCompanyRef = companyref => {
    this.setState({ companyref })
  }
  clearCompanyRef = () => {
    this.setState({ companyref: [] })
  }
  setFollowings = followings => {
    this.setState({ followings })
  }
  addFollowing = company => {
    this.setState({ followings: [...this.state.followings, company] })
  }
  clearFollowings = () => {
    this.setState({ followings: [] })
  }
  getCompany = symbol => {
    return this.state.cache.find(company => company["Symbol"].toLowerCase() === symbol.toLowerCase())
  }
  cacheCompany = company => {
    this.setState({ cache: [...this.state.cache, company] });
    return company;
  }
  render() {
    const value = {
      followings: this.state.followings,
      companyref: this.state.companyref,
      cache: this.state.cache,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCompanyRef: this.setCompanyRef,
      clearCompanyRef: this.clearCompanyRef,
      setFollowings: this.setFollowings,
      addFollowing: this.addFollowing,
      clearFollowings: this.clearFollowings,
      getCompany: this.getCompany,
      cacheCompany: this.cacheCompany
    }
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    )
  }
}