import { useMemo, useState } from 'react'
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText, Divider, Chip } from '@mui/material'

export default function AdminDashboard() {
	const [tools, setTools] = useState(['Career Assessment v1'])
	const [newTool, setNewTool] = useState('')
	const [results, setResults] = useState([
		{ student: 'alice@example.com', score: 'Data Science with Python' },
		{ student: 'bob@example.com', score: 'Web Development with JavaScript' },
	])

	const total = useMemo(() => results.length, [results])

	function addTool() {
		if (!newTool.trim()) return
		setTools((t) => [...t, newTool.trim()])
		setNewTool('')
	}

	return (
		<Box>
			<Typography variant="h5" sx={{ color: 'common.white', mb: 2 }}>Admin Dashboard</Typography>
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
				<Paper sx={{ p: 3 }}>
					<Typography variant="h6" sx={{ mb: 2 }}>Manage Assessment Tools</Typography>
					<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
						<TextField fullWidth label="New Tool Name" value={newTool} onChange={(e) => setNewTool(e.target.value)} />
						<Button variant="contained" onClick={addTool}>Add</Button>
					</Box>
					<List dense>
						{tools.map((t) => (
							<ListItem key={t}><ListItemText primary={t} /></ListItem>
						))}
					</List>
				</Paper>
				<Paper sx={{ p: 3 }}>
					<Typography variant="h6" sx={{ mb: 2 }}>Student Results <Chip label={`Total: ${total}`} size="small" sx={{ ml: 1 }} /></Typography>
					<List dense>
						{results.map((r, idx) => (
							<ListItem key={idx} divider>
								<ListItemText primary={r.student} secondary={`Recommendation: ${r.score}`} />
							</ListItem>
						))}
					</List>
					<Divider sx={{ my: 2 }} />
					<Typography variant="body2" color="text.secondary">Note: This demo stores data client-side only.</Typography>
				</Paper>
			</Box>
		</Box>
	)
}

