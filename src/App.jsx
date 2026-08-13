import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import SinglePost from './pages/SinglePost'
import Navbar from './components/navbar'
import ProtectedRoutes from './components/ProtectedRoutes'


export default function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>} />
                <Route path="/posts/new" element={
                    <ProtectedRoutes>
                        <CreatePost />
                    </ProtectedRoutes>} />
                <Route path="/posts/:id" element={<SinglePost />} />
            </Routes>
        </>
    )
}