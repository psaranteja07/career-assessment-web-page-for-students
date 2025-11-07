import { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useAuth } from '../state/AuthContext.jsx'

export default function LoginPage() {
	const { login } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('student')
	const [error, setError] = useState('')

	function onSubmit(e) {
		e.preventDefault()
		setError('')
		if (!email || !password) {
			setError('Please enter email and password')
			return
		}
		login({ email, role })
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
				<Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
				<form onSubmit={onSubmit}>
					<TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
					<TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
					<ToggleButtonGroup value={role} exclusive onChange={(_, v) => v && setRole(v)} sx={{ mb: 2 }}>
						<ToggleButton value="student">Student</ToggleButton>
						<ToggleButton value="admin">Admin</ToggleButton>
					</ToggleButtonGroup>
					{error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
					<Button type="submit" variant="contained" fullWidth>Login</Button>
				</form>
			</Paper>
		</Box>
	)
}

