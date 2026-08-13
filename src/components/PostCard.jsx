import { Link } from "react-router-dom"

export default function PostCard({ post, dashboard, onEdit, onDelete }) {
    return (
        <div className={dashboard ? 'post-container-dashboard' : 'post-container'}>
            {post.image && <img className={dashboard ? 'post-image-dashboard' : 'post-image'} src={post.image} alt="post" />}
            
            <div className="post-content">
                <div className="post-meta">
                    <span className="post-author">{post.author.name}</span>
                    <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.body.substring(0, 150)}...</p>

                {dashboard ? (
                    <div className="post-actions">
                        <button className="btn green" onClick={onEdit}>Edit</button>
                        <button className="btn red" onClick={onDelete}>Delete</button>
                    </div>
                ) : (
                    <div className="post-interaction">
                        <div style={{display: 'flex', gap: '15px'}}>
                            <span className="post-likes">🤍 {post.likes.length}</span>
                            <span className="post-comments">💬 {post.comments.length}</span>
                        </div>
                        <Link className="read-more" to={`/posts/${post._id}`}>Read →</Link>
                    </div>
                )}
            </div>
        </div>
    )
}