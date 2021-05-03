import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import check from './check.svg';
import phone from './iphoneoutline.svg';
import logo from './logo.png';
import './LandingPage.css'

export default class LandingPage extends Component {

  render() {
    return (
      <main className='landing-page-main'>
        <section id="title">
          <div className='logo-box'>
            <img src={logo} alt="Stock Clock" className='logo'/>
            <h1>Stock Clock</h1>
          </div>
          <p>A better way to simplify and aggregate all your stock 
                information into one platform. Stock Clock opens the door 
                to a simple, clean, and streamlined stock tracking 
                experience.</p>
        </section>
        <section id="description">
          <h1>Personalize</h1>
          <p>Personalize your experience with our flexible and 
              customizable interface. Easily add or remove stocks 
              to a list of tracked companies or utilize the search 
              function to quickly finding companies you want to 
              track and add them to your personal list.</p>
          <div className="step-container">
            <div className='step'>
            <img src={check} alt="check" className='check'/>
            <h2>
                Customize
              </h2>
              <p>your own list of tracked companies and tickers</p>
            </div>
            <div className='step'>
              <img src={check} alt="check" className='check'/>
              <h2>
                Search
              </h2>
              <p>for listed companies on multiple exchanges quickly</p>
            </div>
            <div className='step'>
              <img src={check} alt="check" className='check'/>
              <h2>
                Visualize
              </h2>
              <p>trends andhistorical data on stock prices through graphs</p>
            </div>
          </div>
        </section>
        <section id="feature">
          <img className="phone" src={phone} alt="newsfeed" />
          <div className="feature_text">
            <h1>NewsFeed Integration</h1>
            <p>Not only will you be able to just see trends and 
                prices, but our app offers integration with social 
                media and news services for you to be able to study 
                the market even more effectively. Choose your own 
                sources to follow, or simply click on a time period 
                and our app will automatically pull relevant news from 
                that time!</p>
            </div>
        </section>
        <section id="start">
            <h1>What are you waiting for?</h1>
            <div className="button-box">
              <p> Let Stock Clock help you on 
                your investing journey today and watch your stocks 
                shoot through the moon.</p>
              <Link
                to='/home'
                type='button'
                className='get-started-button'
                >Get Started</Link>
            </div>
        </section>
      </main>
    )
  }
}