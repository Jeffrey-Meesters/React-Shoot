import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlayerForm from '../components/PlayerForm'
import signInUser from '../actions/sign-in-user'

class SignIn extends Component {
  render () {
    const { signInUser } = this.props
    return <PlayerForm  onSubmit={ signInUser } />
  }
}

export default connect(null, { signInUser })(SignIn)
