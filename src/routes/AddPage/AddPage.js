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

  handleAddSuccess = company => {
    this.context.addFollowing(company);
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