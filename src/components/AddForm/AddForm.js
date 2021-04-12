import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import ApiService from '../../services/api-service'

export default class AddForm extends Component {
  static defaultProps = {
    onAddSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { symbol } = ev.target

    ApiService.follow({
      symbol: symbol.value,
    })
      .then(res => {
        symbol.value = ''
        this.props.onAddSuccess(symbol)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='AddForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='symbol'>
          <label htmlFor='AddForm__symbol'>
            Symbol <Required />
          </label>
          <Input
            name='symbol'
            type='text'
            required
            id='AddForm__symbol'>
          </Input>
        </div>
        <Button type='submit'>
          Add Company
        </Button>
      </form>
    )
  }
}
