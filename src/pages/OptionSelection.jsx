import { Box, Grid, Paper, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function OptionSelection() {
	const navigate = useNavigate()
	const { user } = useAuth()
	return (
		<Box>
			<Typography variant="h4" sx={{ color: 'common.white', mb: 3 }}>Welcome{user?.email ? `, ${user.email}` : ''}</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Paper elevation={8} sx={{ p: 3 }}>
						<Typography variant="h6" sx={{ mb: 1 }}>Take Assessment</Typography>
						<Typography sx={{ mb: 2 }}>Discover your strengths and career paths.</Typography>
						<Button variant="contained" onClick={() => navigate('/assessment')}>Start</Button>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper elevation={8} sx={{ p: 3 }}>
						<Typography variant="h6" sx={{ mb: 1 }}>Admin Dashboard</Typography>
						<Typography sx={{ mb: 2 }}>Manage assessment tools and view results.</Typography>
						<Button variant="outlined" onClick={() => navigate('/admin')} disabled={user?.role !== 'admin'}>Open</Button>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

