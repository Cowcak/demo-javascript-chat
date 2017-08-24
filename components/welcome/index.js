import React, { Component } from 'react'

import Meta from '../meta'
import Logo from './logo'
import Button from './button'
import Input from './input'

export default class WelcomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiKey: '',
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { apiKey } = this.state
    
    if (apiKey == '' || apiKey.length < 5) {
      alert('Please provide a valid API key.')
      return
    }

    this.props.onSubmit(apiKey)
  }

  render() {
    const { apiKey } = this.state

    return (
      <div className="page">
        <Meta />
        <main>
          <div className="wrap">
            <Logo />
            <h1>Chat Demo App</h1>
            <p>For launching this demo app you need to fill in your API key for Demo Chat Project.</p>
            <form onSubmit={this.handleSubmit}>
              <Input
                placeholder="API key"
                value={apiKey}
                onChange={this.handleInputChange}
                name="apiKey"
                margin="0 0 40px 0"
              />
              <Button>
                Launch App
              </Button>
            </form>
          </div>
        </main>
        <style jsx>
          {`
          .page {
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
          }
          .wrap {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
            padding: 0 20px;
          }

          .wrap :global(button) {
            width: 100%;
          }

          h1 {
            margin: 20px 0 0;
            padding: 0;
          }
          p {
            padding: 40px;
          }

          a {
            color: #CF4647;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }
        `}
        </style>
      </div>
    ) 
  }
}


