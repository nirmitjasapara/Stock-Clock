import React, { Component } from "react";
import { Button, Input, Required } from "../Utils/Utils";
import ApiService from "../../services/api-service";
import CustomContext from "../../contexts/CustomContext";

export default class AddForm extends Component {
  static contextType = CustomContext;
  static defaultProps = {
    onAddSuccess: () => {}
  };

  state = { error: null };

  componentDidMount() {
    this.context.clearError();
    ApiService.fillCompanyList()
      .catch(this.context.setError)
      .then(this.context.setCompanyRef);
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { symbol } = ev.target;

    ApiService.follow({
      symbol: symbol.value
    })
      .then(res => {
        symbol.value = "";
        this.props.onAddSuccess(res);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  renderList() {
    const { companyref = [] } = this.context;
    return companyref.map(company => (
      <option
        value={company.symbol}
        label={company.name}
        key={"company-" + company.symbol}
      />
    ));
  }

  render() {
    const { error } = this.state;
    return (
      <form className="AddForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="symbol">
          <label htmlFor="AddForm__symbol">
            Symbol <Required />
          </label>
          <Input
            name="symbol"
            type="text"
            required
            list="companyref"
            id="AddForm__symbol"
          ></Input>
          <datalist id="companyref">{this.renderList()}</datalist>
        </div>
        <Button type="submit">Add Company</Button>
      </form>
    );
  }
}
