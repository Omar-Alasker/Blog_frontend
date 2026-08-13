import useAuthStore from "../store/authStore"
import { Navigate } from "react-router-dom"

export default function ProtectedRoutes({children}) {

    const { token } = useAuthStore()

    if(!token) return <Navigate to={"/login"}/>
    return children
}
