import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import './UserForm.sass'

const textFieldStyle = {
  width: '96%'
}

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      passwordError: false
    }
  }

  submitForm(event) {
      event.preventDefault()

      const { name, email, password, passwordConfirmation } = this.refs

      console.log('name: ', (name && name.getValue()))
      console.log('email: ', (email && email.getValue()))
      console.log('password: ', (password && password.getValue()))
      console.log('passwordConfirmation: ', (passwordConfirmation && passwordConfirmation.getValue()))

      const formData = {
        name: name && name.getValue(),
        email: email && email.getValue(),
        password: password && password.getValue(),
      }

      this.props.onSubmit(formData)
    }

    checkPasswords() {
    if (!this.props.signUp) return

    const { password, passwordConfirmation } = this.refs

    if (password.getValue() === passwordConfirmation.getValue()) {
      this.setState({
        passwordError: false
      })

      return
    }

    this.setState({
    passwordError: true
  })
}



  render () {
    const { signUp } = this.props

    return (
    <Paper className="user-form" zDepth={3}>
      <form onSubmit={ this.submitForm.bind(this) }>
      <h1>{ signUp ? 'Sign Up' : 'Sign In' }</h1>

      { signUp ?
        <div className="input">
          <TextField
            style={ textFieldStyle }
            ref="name"
            hintText="Name"
            floatingLabelText="Your name"
            type="text"
            />
        </div> : null }

        <div className="input">
          <TextField
            style={ textFieldStyle }
            ref="email"
            hintText="Email"
            floatingLabelText="Email"
            type="email"
          />
        </div>

        <div className="input">
          <TextField
            style={ textFieldStyle }
            ref="password"
            hintText="Password"
            floatingLabelText="Password"
            type="password"
          />
        </div>

      { signUp ?
        <div className="input">
              <TextField
                style={ textFieldStyle }
                ref="passwordConfirmation"
                hintText="Password Confirmation"
                floatingLabelText="Confirm your password"
                type="password"
                onChange={ this.checkPasswords.bind(this) }
                errorText={ this.state.passwordError ? 'Passwords don\'t match!' : null }
              />
            </div> : null }

        <div className="controls">
          <RaisedButton style={{ float: 'right' }} type="submit" disabled={ this.state.passwordError } label={ signUp ? 'Sign Up' : 'Sign In' } primary={true}  />
          <FlatButton label={ signUp ? 'Sign In' : 'Sign Up' } href={ signUp ? '/sign-in' : '/sign-up' } />
        </div>
      </form>
      </Paper>
    )
  }
}


export default UserForm
