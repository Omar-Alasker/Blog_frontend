import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useState } from 'react'

export default function Login() {

    const { login } = useAuthStore()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')


    const handleLogin = async () => {
        try{
            const { data } = await api.post('/auth' , { email , password })
            console.log(data)

            const token = data.token
            const user = data.user
            if(token){
                login(token, user)
                navigate('/')
            }
            else return console.log('no token provided')
        }
        catch(err){
            console.log(err.response.data.message)
            setError(err.response.data.message)
        }
    }

    

  return (
    <div>
        
        {error && <p>{error}</p>}
        
        <form onSubmit={(e) => { e.preventDefault(); handleLogin()}}>
            <div style={{marginTop: '30px'}} className='login-form'>
                <h1>Welcome Back!</h1>
                <span className='hello-msg-login'>Sign in to continue to your dashboard.</span>
                <div className='email-pass-wrapper'>
                    <label className='label'>Email Address</label>
                    <input placeholder="Email" className='input' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='email-pass-wrapper'>
                    <label className='label'>Password</label>
                    <input placeholder="Password" type="password" className='input' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='login-btn' type='submit'>Sign In</button>
                <div>                
                    <span>Don't have an account? </span> 
                    <a href="/register">Register</a>
                </div>
            </div>    
        </form>
    </div>
  )
}
