import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {

  render() {
    return (
      <main className='landing-page-main'>
        <div>
            <h1>APPNAME</h1>
            <p>Ipsum Lorem</p>
            <Link
                to='/home'
                type='button'
                className='get-started-button'
                >Get Started</Link>
        </div>
        <div>
            <img/>
        </div>
      </main>
    )
  }
}