import { useEffect, useState } from "react"
import api from "../api/axios"
import PostCard from "../components/PostCard"

export default function Home() {

  const [posts , setPosts] = useState([])
  const [loading , setLoading] = useState(false)
  const [search , setSearch] = useState('')
  
  const fetchPosts = async () => {
      try{
        setLoading(true)
        const { data } = await api.get('/posts')
        console.log('posts:', data)
        setPosts(data)
        setLoading(false)
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
    }
    
  useEffect(() => {
    fetchPosts()
  }, []
  )

  const handleSearch = async (e) => {
    e.preventDefault()
    try{
      setLoading(true)  
      const { data } = await api.get(`/posts/search?title=${search}`)
      setPosts(data)
      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  return (
    
    <div className="home-container center-container">
      <div className="search-container">
        <h1 style={{marginTop: '30px'}}>Insights & Perspectives</h1>
        <p>A curated collection of thoughts on design, technology, and the future of digital experiences.</p>
        <div className="search-div">
          <form onSubmit={handleSearch}>
            <input 
                className="search-input"
                type="text" 
                placeholder="Search posts..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button style={{outline: 'none' , border: 'none' , backgroundColor: 'white'}} type="submit">Search</button>
            <button style={{outline: 'none' , border: 'none' , backgroundColor: 'white'}} onClick={() => {setSearch(''); fetchPosts()}}>Clear</button>
          </form>
        </div> 
      </div>
      <div className="posts-container">
        {loading && <p>Loading...</p>}
        {posts.map((post) => (
          <PostCard key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}
