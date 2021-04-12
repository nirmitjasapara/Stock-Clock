import React, { Component } from 'react'

const CustomContext = React.createContext({
  followings: [],
  companies: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setFollowings: () => {},
  clearFollowings: () => {},
  addCompany: () => {},
  clearCompanies: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    followings: [],
    companies: [],
    error: null
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }
  setFollowings = followings => {
    this.setState({ followings });
    return followings;
  }
  clearFollowings = () => {
    this.setState({ followings: [] })
  }
  addCompany = company => {
    this.setState({ companies: [...this.state.companies, company] })
  }
  clearCompanies = () => {
    this.setState({ companies: [] })
  }
  render() {
    const value = {
      followings: this.state.followings,
      companies: this.state.companies,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setFollowings: this.setFollowings,
      clearFollowings: this.clearFollowings,
      addCompany: this.addCompany,
      clearCompanies: this.clearCompanies
    }
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    )
  }
}