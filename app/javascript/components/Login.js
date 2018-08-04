import React from 'react'
import request from "superagent"

import './styles/Login.scss'

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render () {
    return (
      <div id='id_box'>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor='username_input'>Username</label>
            <input type='textfield' id='username_input' className='form-control' />
          </div>
          <div className="form-group">
            <label htmlFor='password_input'>Password</label>
            <input type='password' id='password_input' className='form-control' />
          </div>
          <button type='submit' className='btn btn-primary'>Log in</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    request
      .post(`/api/sessions.json`)
      .set('X-CSRF-Token', this.props.csrfToken)
      // .send({username: , password: })
      .send({})
      .end((error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log('success');
        }
      })
  }
}

export default Login;
