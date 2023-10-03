import { useContext } from "react"
import { AuthContext } from "../../context"
import { Navigate } from "react-router-dom"

export function ProtectedRoute({children}) {
    const { user } = useContext(AuthContext)
    return user ? children : <Navigate to = "/SignIn" />
}