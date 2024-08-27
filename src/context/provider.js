import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authSuccess } from '@/store/actions/auth.slice'
import { ENV_VAR } from '@/config/envVar'
import axios from "axios"

export const AuthProvider = ({ children }) => {
    const [fetched, setFetched] = useState(false)
    const [token, setToken] = useState('')
    const dispatch = useDispatch()
    const apiUri = ENV_VAR.API_URI

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);


    useEffect(() => {
        if (!token || !apiUri || fetched) return

        const fetchUserInfo = async () => {
            try {
                const res = await axios.get(`${apiUri}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = res.data
                dispatch(authSuccess(data.user))
                setFetched(true)
            } catch (error) {
                console.error("Failed to fetch user info:", error)
            }
        }
        fetchUserInfo()
    }, [token, apiUri, fetched, dispatch])


    return <>{children}</>
}