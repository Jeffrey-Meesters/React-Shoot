import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlayerForm from '../components/PlayerForm'
import signUpUser from '../actions/sign-up-user'

class SignUp extends Component {
  render () {
    const { signUpUser } = this.props
    return <PlayerForm signUp={true} onSubmit={ signUpUser } />
  }
}

export default connect(null, { signUpUser })(SignUp)
