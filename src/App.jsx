import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Container, Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import LoginPage from './pages/Login.jsx'
import OptionSelection from './pages/OptionSelection.jsx'
import AssessmentPage from './pages/Assessment.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { useAuth } from './state/AuthContext.jsx'

function ProtectedRoute({ children, allowed }) {
	const { user } = useAuth()
	if (!user) return <Navigate to="/login" replace />
	if (allowed && !allowed.includes(user.role)) return <Navigate to="/" replace />
	return children
}

export default function App() {
	const { user, logout } = useAuth()
	return (
		<Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
			<AppBar position="static" color="transparent" elevation={0}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h6" sx={{ color: 'common.white' }}>Career Assessment</Typography>
					<Box>
						<Button component={Link} to="/" sx={{ color: 'common.white' }}>Home</Button>
						{user ? (
							<Button onClick={logout} sx={{ color: 'common.white' }}>Logout</Button>
						) : (
							<Button component={Link} to="/login" sx={{ color: 'common.white' }}>Login</Button>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Container maxWidth="md" sx={{ py: 4 }}>
				<Routes>
					<Route path="/" element={<ProtectedRoute><OptionSelection /></ProtectedRoute>} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/assessment" element={<ProtectedRoute allowed={["student", "admin"]}><AssessmentPage /></ProtectedRoute>} />
					<Route path="/admin" element={<ProtectedRoute allowed={["admin"]}><AdminDashboard /></ProtectedRoute>} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Container>
		</Box>
	)
}

