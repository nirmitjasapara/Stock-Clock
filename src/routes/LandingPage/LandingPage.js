import React, { Component } from "react";
import { Link } from "react-router-dom";
import check from "./check.svg";
import phone from "./iphoneoutline.svg";
import logo from "./logo.png";
import "./LandingPage.css";
import i18n from "i18next";
import { initReactI18next, withTranslation, useTranslation } from "react-i18next";
import { Suspense } from "react";
import { translationEn, translationFr } from "./translations.js";



i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      fr: { translation: translationFr },
    },
    lng: "en",
    fallbackLng: "en",
    keySeparator: ".",
    interpolation: { escapeValue: false },
  });




class LandingPage extends Component {
  render() {
    const { t } = this.props;
    const onChange = (event) => {
      i18n.changeLanguage(event.target.value);
    }
    return (
      <Suspense fallback="Loading...">
      <main className="landing-page-main">
        <select name="language" onChange={onChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
        <section id="title">
          <div className="logo-box">
            <img src={logo} alt="Stock Clock" className="logo" />
            <h1>Stock Clock</h1>
          </div>
          <p>
            {t('block1')}
          </p>
        </section>
        <section id="description">
          <h1>{t('block2.header')}</h1>
          <p>
          {t('block2.p1')}
          </p>
          <div className="step-container">
            <div className="step">
              <img src={check} alt="check" className="check" />
              <h2>{t('block2.columns.title1')}</h2>
              <p>{t('block2.descriptions.title1')}</p>
            </div>
            <div className="step">
              <img src={check} alt="check" className="check" />
              <h2>{t('block2.columns.title2')}</h2>
              <p>{t('block2.descriptions.title2')}</p>
            </div>
            <div className="step">
              <img src={check} alt="check" className="check" />
              <h2>{t('block2.columns.title3')}</h2>
              <p>{t('block2.descriptions.title3')}</p>
            </div>
          </div>
        </section>
        <section id="feature">
          <img className="phone" src={phone} alt="newsfeed" />
          <div className="feature_text">
            <h1>{t('block3.header')}</h1>
            <p>
            {t('block3.description')}
            </p>
          </div>
        </section>
        <section id="start">
          <h1>{t('block4.header')}</h1>
          <div className="button-box">
            <p>
            {t('block4.description')}
            </p>
            <Link to="/home" type="button" className="get-started-button">
            {t('block4.button')}
            </Link>
          </div>
        </section>
      </main>
      </Suspense>
    );
  }
}

export default withTranslation() (LandingPage)
