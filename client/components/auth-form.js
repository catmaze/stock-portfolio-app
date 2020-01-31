import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="box-container">
      <h2>{displayName}</h2>
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        {name !== 'register' ? (
          ''
        ) : (
          <div>
            <input name="userName" type="text" placeholder="Name" />
          </div>
        )}
        <div>
          <input name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <input name="password" type="password" placeholder="Password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign In',
    error: state.user.error
  }
}

const mapRegister = state => {
  return {
    name: 'register',
    displayName: 'Register',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const userName = formName === 'register' ? evt.target.userName.value : ''
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(userName, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Register = connect(mapRegister, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
