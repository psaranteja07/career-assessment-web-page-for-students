import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	function login({ email, role }) {
		setUser({ email, role })
		navigate('/')
	}

	function logout() {
		setUser(null)
		navigate('/login')
	}

	const value = useMemo(() => ({ user, login, logout }), [user])
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	return useContext(AuthContext)
}

