import React from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContextValue'  
import axios from 'axios';

// currentState can be 'Login' or 'Signup'
export const Login = ({ setShowLogin }) => {

const{url,setToken}=React.useContext(StoreContext);  

  // State to track current view (Login/Signup)
  const [currentState, setCurrentState] = React.useState('Login') // default to Login view
  const [data,setData]=React.useState({
    name:"",
    phone:"",
    email:"",
    password:""
  })
// Input onchange handler
  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((prevData)=>({  ...prevData, [name]: value }));
  } 

  const [message, setMessage] = React.useState(null)
  const [acceptedTos, setAcceptedTos] = React.useState(false)

  const onlogin = async (e) => {
    e.preventDefault()
    setMessage(null)

    try {
      // Validation
      if (currentState === 'Signup') {
        if (!data.name.trim() || !data.email.trim() || !data.password) {
          setMessage({ type: 'error', text: 'Please fill all required fields.' })
          return
        }
        if (!acceptedTos) {
          setMessage({ type: 'error', text: 'Please accept Terms of Service.' })
          return
        }
      } else {
        if (!data.email.trim() || !data.password) {
          setMessage({ type: 'error', text: 'Please enter email and password.' })
          return
        }
      }

      // Determine API endpoint
      let newUrl = url
      if (currentState === 'Login') {
        newUrl = `${url}/api/user/login`
      } else {
        newUrl = `${url}/api/user/register`
      }

      // Make API call
      const response = await axios.post(newUrl, data)

      // Handle response
      if (response.data.success) {
        if (setToken) {
          setToken(response.data.token)
        }
        localStorage.setItem('token', response.data.token)
        setMessage({ type: 'success', text: response.data.message })
        setTimeout(() => setShowLogin(false), 1000)
      } else {
        setMessage({ type: 'error', text: response.data.message })
      }
    } catch (error) {
      console.error('Authentication error:', error)
      if (error.response) {
        setMessage({ type: 'error', text: error.response.data.message || 'Server error' })
      } else {
        setMessage({ type: 'error', text: 'Network error. Please try again.' })
      }
    }
  }

  return (
    <div className='login'>
      <form className='login-form' onSubmit={onlogin}>
        <div className='login-form-header'>
          <h2>{currentState === 'Signup' ? 'Create account' : 'Log in'}</h2>
          <img onClick={() => setShowLogin && setShowLogin(false)} src={assets.cross_icon} alt='Close' className='close-icon' />
        </div>

        <div className='login-form-inputs'>
          {currentState === 'Signup' && (
            <>
              <input 
                name='name' 
                value={data.name} 
                onChange={onChangeHandler} 
                type='text' 
                placeholder='Enter your name' 
                required 
              />
              <input 
                name='phone' 
                value={data.phone} 
                onChange={onChangeHandler} 
                type='tel' 
                placeholder='Enter your phone number' 
                required 
              />
            </>
          )}

          <input 
            name='email' 
            value={data.email} 
            onChange={onChangeHandler} 
            type='email' 
            placeholder='Enter your email' 
            required 
          />
          <input 
            name='password' 
            value={data.password} 
            onChange={onChangeHandler} 
            type='password' 
            placeholder='Enter your password' 
            required 
          />
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