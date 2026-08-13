import { useParams } from "react-router-dom"
import api from "../api/axios"
import { useEffect , useState } from "react"
import useAuthStore from "../store/authStore"


export default function SinglePost() {
  const { id } = useParams()
  const [post , setPost] = useState(null)
  const [loading , setLoading] = useState(false)
  const [showComments , setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const {user} = useAuthStore()

  useEffect(() => {
    const fetchPost = async () => {
    try{
      setLoading(true)
      const { data } = await api.get(`/posts/${id}`)
      setPost(data)
      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
    }
    fetchPost()
  },[])

    
  const handleLike = async () => {
    try{
      setLoading(true)
      await api.put(`/posts/${id}/like`)
      const {data} = await api.get(`/posts/${id}`)
      setPost(data)
      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  const handleComment = async () => {
    try{
      setLoading(true)
      await api.post(`/posts/${id}/comments` ,{body: newComment})
      setNewComment('')
      const {data} = await api.get(`/posts/${id}`)
      setPost(data)
      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }
  
  
  return (
    <div className="single-post-container">
        {loading && <p>Loading...</p>}
        {post && (
            <div>
                {/* Hero Image */}
                {post.image && (
                    <img className="single-post-hero" src={post.image} alt="post" />
                )}

                {/* Author Info */}
                <div className="single-post-author-info">
                    <div>
                        <div className="single-post-author-name">{post.author.name} {post.author.surname}</div>
                        <div className="single-post-date">{new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="single-post-title">{post.title}</h1>
                <div className="single-post-divider"></div>

                {/* Interaction bar */}
                <div className="single-post-interaction">
                    <button onClick={handleLike}>
                        {post.likes.includes(user?._id) ? '❤️' : '🤍'} {post.likes.length}
                    </button>
                    <button onClick={() => setShowComments(!showComments)}>
                        💬 {post.comments.length}
                    </button>
                </div>

                {/* Body */}
                <p className="single-post-body">{post.body}</p>

                {/* Comments */}
                {showComments && (
                    <div className="comments-section">
                        {post.comments.map((comment) => (
                            <div className="comment-card" key={comment._id}>
                                <p className="comment-author">{comment.author.name}</p>
                                <p className="comment-body">{comment.body}</p>
                            </div>
                        ))}
                        <div className="add-comment">
                            <input
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="btn blue" onClick={handleComment}>Post</button>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
)}
