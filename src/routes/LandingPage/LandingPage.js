import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {

  render() {
    return (
      <main className='landing-page-main'>
        <div>
            <h1>About Stock Clock</h1>
            <p>A better way to simplify and aggregate all your stock 
              information into one platform. Stock Clock opens the door 
              to a simple, clean, and streamlined stock tracking 
              experience.</p>
            <p>Personalize your experience with our flexible and 
              customizable interface. Easily add or remove stocks 
              to a list of tracked companies or utilize the search 
              function to quickly finding companies you want to 
              track and add them to your personal list.</p>
            <p>Not only will you be able to just see trends and 
              prices, but our app offers integration with social 
              media and news services for you to be able to study 
              the market even more effectively. Choose your own 
              sources to follow, or simply click on a time period 
              and our app will automatically pull relevant news from 
              that time!</p>
            <p>What are you waiting for? Let Stock Clock help you on 
              your investing journey today and watch your stocks 
              shoot through the moon.</p>
            <Link
                to='/home'
                type='button'
                className='get-started-button'
                >Get Started</Link>
        </div>
        <div>
            <img alt="placeholder"/>
        </div>
      </main>
    )
  }
}