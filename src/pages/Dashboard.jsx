import { useEffect, useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import PostCard from "../components/PostCard"


export default function Dashboard() {

  const [myPosts , setMyPosts] = useState([])
  const [loading , setLoading] = useState(false)
  const [editPost, setEditPost] = useState(null)
  const [formData , setFormData] = useState({
    title: '',
    body: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyPosts = async () => {
    try{
      const {data} = await api.get(`/posts/my-posts`)
      setMyPosts(data)
    }
    catch(err){
      console.log(err)
    }
  }
  fetchMyPosts()
} , [])

  const editMyPost = async (postId) => {
    try{
      setLoading(true)
      await api.put(`/posts/${postId}` , formData)
      const {data} = await api.get(`/posts/my-posts`)
      setEditPost(null)
      setFormData({title: '' , body: ''})
      setMyPosts(data)
      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  const deleteMyPost = async (postId) => {
    try{
      await api.delete(`/posts/${postId}`)
      const {data} = await api.get('/posts/my-posts')
      setMyPosts(data)
    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <div className="dashboard-header-container">
        <h1>Your Posts</h1>
        <button className="dash-btn" onClick={() => navigate('/posts/new')}>Create New Post</button>
      </div>
      {loading && <p>loading...</p>}
      <div className="dashboard-container">
        {myPosts.map((myPost) => (
          <div key={myPost._id}>
              <PostCard post={myPost} dashboard={true} onEdit={() => setEditPost(myPost._id)} onDelete={() => deleteMyPost(myPost._id)}/>
      
              {editPost === myPost._id && 
                (
                  <form className="edit-form" onSubmit={(e) => { e.preventDefault(); editMyPost(myPost._id) }}>
                    <div style={{display: 'flex', gap: '10px'}}>
                      <input className="input" placeholder="title..." value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                      <input className="input" placeholder="body..." value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})}/>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button className="btn green" type="submit">Save</button>
                        <button className="btn red" onClick={() => setEditPost(null)}>Cancel</button>
                    </div>
                  </form>
                )
              }
          </div>
        ))}
      </div>
    </div>
  )
}
