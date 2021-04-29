import React, { Component } from 'react'
import AddForm from '../../components/AddForm/AddForm'
import ApiService from '../../services/api-service';
import { Section } from '../../components/Utils/Utils'
import './AddPage.css'

export default class AddPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleAddSuccess = symbol => {
    console.log(symbol);
    ApiService.getCompanyData(symbol)
          .then(this.context.addFollowing)
          .catch(this.context.setError)
    const { history } = this.props
    history.push('/home')
  }

  render() {
    return (
      <Section className='AddPage'>
        <h2>Follow Stock</h2>
        <AddForm
          onAddSuccess={this.handleAddSuccess}
        />
      </Section>
    )
  }
}