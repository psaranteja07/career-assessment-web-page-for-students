import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material'

const courses = [
	{
		title: 'Data Science with Python',
		materials: [
			'Introduction to Python',
			'Data Structures',
			'Data Analysis with Pandas',
			'Data Visualization with Matplotlib',
		],
	},
	{
		title: 'Web Development with JavaScript',
		materials: [
			'Introduction to JavaScript',
			'Front-end Development with React',
			'Back-end Development with Node.js',
		],
	},
	{
		title: 'Digital Marketing',
		materials: [
			'Introduction to Digital Marketing',
			'SEO',
			'Social Media Marketing',
			'Email Marketing',
		],
	},
]

export default function CourseSection() {
	return (
		<Box sx={{ mt: 4 }}>
			<Typography variant="h6" sx={{ mb: 2 }}>Recommended Courses</Typography>
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
				{courses.map((course) => (
					<Paper key={course.title} sx={{ p: 2 }}>
						<Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{course.title}</Typography>
						<List dense>
							{course.materials.map((m) => (
								<ListItem key={m} sx={{ py: 0 }}>
									<ListItemText primary={m} />
								</ListItem>
							))}
						</List>
					</Paper>
				))}
			</Box>
		</Box>
	)
}

