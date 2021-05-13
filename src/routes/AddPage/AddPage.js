import React, { Component } from "react";
import AddForm from "../../components/AddForm/AddForm";
import ApiService from "../../services/api-service";
import CustomContext from "../../contexts/CustomContext";
import { Section } from "../../components/Utils/Utils";
import "./AddPage.css";

export default class AddPage extends Component {
  static contextType = CustomContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleAddSuccess = company => {
    const { history } = this.props;
    this.context.addFollowing(company);
    ApiService.getQuotes([company])
      .catch(this.context.setError)
      .then(json => json[0])
      .then(this.context.addTicker);
    history.push("/home");
  };

  render() {
    return (
      <main className="add-page-main">
        <Section className="AddPage">
          <h2>Follow Stock</h2>
          <p className="explanation">
            Please add the symbol of the company you want to follow. You can
            also type in a part of the company's name and click the appropriate
            company in the dropdown.
          </p>
          <AddForm onAddSuccess={this.handleAddSuccess} />
        </Section>
      </main>
    );
  }
}
