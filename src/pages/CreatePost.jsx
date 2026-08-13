import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import { DraftingCompass } from "lucide-react"


export default function CreatePost() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: ''
  })
  const [loading , setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleCreatePost = async () => {
    try{
      setLoading(true)
      await api.post('/posts' , formData)
      navigate('/')
      setLoading(false)
    }
    catch(err){
        console.log(err.response.data)  
        setError(err.response.data.message)
        setLoading(false)
    }
  }

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={(e) => {e.preventDefault() ; handleCreatePost()}} className="create-post-form">
        <div style={{marginTop: '30px'}} className="login-form">
          <div className="flex-container">
            <DraftingCompass/>
            <button className="create-post-btn" type="submit">Publish</button>
          </div>
          <input className="special-input" type="text" placeholder="Enter Post Title..." value={formData.title} onChange={(e) => {setFormData({...formData, title: e.target.value}); setError('')}}/>
          <input className="image-input" type="text" placeholder="https://example.com/image.jpg" value={formData.image} onChange={(e) => {setFormData({...formData, image: e.target.value}); setError('')}}/>
          <input className="body-input" type="text" placeholder="Enter Post Body..." value={formData.body} onChange={(e) => {setFormData({...formData, body: e.target.value}); setError('')}}/>
        </div>
      </form>
    </div>
  )
}
