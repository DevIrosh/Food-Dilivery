import React from 'react'
import './Login.css'
import { assets } from '../../assets/assets'

// currentState can be 'Login' or 'Signup'
export const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = React.useState('Login') // default to Login view
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState(null)
  const [acceptedTos, setAcceptedTos] = React.useState(false) // set acceptedTos to false initially
  const onSubmit = (e) => {
    e.preventDefault()
    setMessage(null)

    if (currentState === 'Signup') {
      if (!name.trim() || !phone.trim() || !email.trim() || !password) {
        setMessage({ type: 'error', text: 'Please fill all required fields (name, phone, email, password).' })
        return
      }
      if (!acceptedTos) {
        setMessage({ type: 'error', text: 'Please accept the Terms of Service and Privacy Policy to continue.' })
        return
      }
      // For now just show success; integration with backend/auth can be added later
      setMessage({ type: 'success', text: 'Account details collected. (Demo only)' })
      console.log('Signup payload:', { name, phone, email, password })
      if (setShowLogin) setTimeout(() => setShowLogin(false), 700)
      return
    }

    // Login mode
    if (!email.trim() || !password) {
      setMessage({ type: 'error', text: 'Please enter email and password.' })
      return
    }
    setMessage({ type: 'success', text: 'Login submitted. (Demo only)' })
    console.log('Login payload:', { email, password })
    if (setShowLogin) setTimeout(() => setShowLogin(false), 500)
  }

  return (
    <div className='login'>
      <form className='login-form' onSubmit={onSubmit}>
        <div className='login-form-header'>
          <h2>{currentState === 'Signup' ? 'Create account' : 'Log in'}</h2>
          <img onClick={() => setShowLogin && setShowLogin(false)} src={assets.cross_icon} alt='Close' className='close-icon' />
        </div>

        <div className='login-form-inputs'>
          {currentState === 'Signup' && (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter your name' required />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type='tel' placeholder='Enter your phone number' required />
            </>
          )}

          <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your email' required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' required />
        </div>

        {message && <div className={`login-message ${message.type}`}>{message.text}</div>}

        {currentState === 'Signup' && (
          <div className='login-form-toggle'>
            <label>
              <input type='checkbox' id='toggleState' checked={acceptedTos} onChange={(e) => setAcceptedTos(e.target.checked)} />
              <span> By continuing you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span></span>
            </label>
          </div>
        )}

        <div className='login-form-footer'>
          <button type='submit' className='login-submit-btn'>
            {currentState === 'Signup' ? 'Create Account' : 'Login'}
          </button>
        </div>

        <div className='login-switch'>
          {currentState === 'Signup' ? (
            <p>
              Already have an account? <span onClick={() => setCurrentState('Login')}>Login</span>
            </p>
          ) : (
            <p>
              Create a new account <span onClick={() => setCurrentState('Signup')}>Do it here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
export default Login