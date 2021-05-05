import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as Title} from './title.svg';
import '../App/App.css'
import './Header.css'
import TokenService from '../../services/token-service';

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='log-out'>
        <Link
          to='/home'
          className='nav-button'>
          Home
        </Link>
        <Link
          to='/add'
          className='nav-button'>
          Add Stock
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/'
          className='nav-button'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='log-in'>
        <Link
          to='/register'
          className='nav-button'>
          Register
        </Link>
        <Link
          to='/login'
          className='nav-button'>
          Log in
        </Link>
      </div>
    )
  }

  render() {
    return (
      <header className='Header'>
          <Link to='/'>
            <Title className='title'/>
          </Link>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}