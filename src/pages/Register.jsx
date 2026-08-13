import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useState } from 'react'


export default function Register() {

    const { login } = useAuthStore()
    const navigate = useNavigate()

    const [error , setError] = useState('')
    const [formData , setFormData] = useState({
        name : '',
        surname : '',
        age : '',
        gender : '',
        email : '',
        password : ''
    })

    const registerUser = async () => {
      try{
        const response = await api.post('/users' , formData) //data is token
        console.log(response)

        const user = response.data
        const token = response.headers['x-auth-token']
        if(token){
          login(token , user) 
          navigate('/')
        }
        
      }
      catch(err){
        setError(err.response.data.message)
      }
    }
    

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); registerUser()}}>
        <div style={{marginTop: '30px'}} className='login-form'>
          <h4 className='register-hello-msg'>JOIN THE CONVERSATION</h4>
          <h1>Create an account</h1>
          <span className='hello-msg-login'>sign in to gain access to premium features and content</span>
          <input className='input' placeholder="Fist Name" type="text" value={formData.name} onChange={(e) => setFormData({...formData , name: e.target.value})}/>
          <input className='input' placeholder="Last Name" type="text" value={formData.surname} onChange={(e) => setFormData({...formData, surname: e.target.value})}/>
          <input min={0} className='input' placeholder="Age" type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}/>
          <input className='input' placeholder="Gender" type="text" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}/>
          <input className='input' placeholder="Email" type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
          <input className='input' placeholder="Password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
          <button className='login-btn' type='submit'>Register</button>
          <div>
            <span className='already'>Already have an account? </span>
            <a href="/login">Login</a>
          </div>
        </div>
      </form>
    </div>
  )
}
