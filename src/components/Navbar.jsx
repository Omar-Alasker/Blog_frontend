import useAuthStore from "../store/authStore"
import { Link, useNavigate } from "react-router-dom"


export default function Navbar() {

    const {user , token , logout} = useAuthStore()
    const navigate = useNavigate()

  return (
    <>
        {
            token ? 
                <nav className="logged-nav-container">
                    <h2 onClick={() => navigate('/')}>Bloggy</h2>
                    <div style={{display: 'flex', gap: "10px", alignItems: 'center'}}>
                        <button className="create-post-btn" onClick={() => logout()}>Logout</button>
                        <Link to={'/dashboard'}>{user.name}</Link>
                    </div> 
                </nav>
            :   <nav className="not-logged-nav-container">
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </nav>
        }
    </>
  )
}
