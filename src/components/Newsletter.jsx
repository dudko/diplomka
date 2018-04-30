import React, { Component } from 'react'

export default class Newsletter extends Component {
  state = {
    email: '',
    signingUp: false,
    signedUp: false,
  }

  subscribe = email => {
    this.setState({ signingUp: true })

    fetch(process.env.REACT_APP_SUBSCRIBERS_DB, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(e => this.setState({ signingUp: false }))
      .then(() => this.setState({ signingUp: false, signedUp: true }))
  }

  render() {
    const { email, signingUp, signedUp } = this.state

    return (
      <div>
        <h4 className="ui inverted header">Get email updates</h4>
        <div className="ui action fluid input">
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <button
            className={`ui icon ${signingUp && ' loading'} ${signedUp &&
              ' green'} button`}
            onClick={() => this.subscribe(email)}
          >
            {signedUp ? <i className={'checkmark icon'} /> : 'Submit'}
          </button>
        </div>
      </div>
    )
  }
}
