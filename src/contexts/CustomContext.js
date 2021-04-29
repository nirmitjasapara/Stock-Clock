import React, { Component } from 'react'

const CustomContext = React.createContext({
  followings: [],
  companyref: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setCompanyRef: () => {},
  addFollowing: () => {},
  clearFollowings: () => {},
  clearCompanyRef: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    followings: [],
    companyref: [],
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
  addFollowing = company => {
    this.setState({ followings: [...this.state.followings, company] })
  }
  clearFollowings = () => {
    this.setState({ followings: [] })
  }
  clearCompanyRef = () => {
    this.setState({ companyref: [] })
  }
  render() {
    const value = {
      followings: this.state.followings,
      companyref: this.state.companyref,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCompanyRef: this.setCompanyRef,
      addFollowing: this.addFollowing,
      clearFollowings: this.clearFollowings,
      clearCompanyRef: this.clearCompanyRef
    }
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    )
  }
}