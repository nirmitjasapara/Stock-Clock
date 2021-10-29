import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Section } from "../../components/Utils/Utils";
import "./RegistrationPage.css";
import {Helmet} from "react-helmet";

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <main className="registration-page-main">
        <Helmet>
                <title>Stock Clock - Registration</title>
                <meta name="description" content="Register for your Stock Clock account today!" />
        </Helmet>
        <Section className="RegistrationPage">
          <h2>Register</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </Section>
      </main>
    );
  }
}
