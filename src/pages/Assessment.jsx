import { useMemo, useState } from 'react'
import { Box, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button, LinearProgress, Divider, Chip, Alert } from '@mui/material'
import CourseSection from '../components/CourseSection.jsx'

const questions = [
	{ id: 1, text: 'I enjoy solving analytical problems.', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], weight: { data: 2 } },
	{ id: 2, text: 'I like creating user interfaces and web pages.', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], weight: { web: 2 } },
	{ id: 3, text: 'I prefer working with people and promoting ideas.', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], weight: { marketing: 2 } },
	{ id: 4, text: 'I am comfortable with programming in Python or want to learn.', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], weight: { data: 2 } },
	{ id: 5, text: 'I am interested in social media campaigns.', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], weight: { marketing: 2 } },
]

function scoreMap(choiceIndex) {
	return choiceIndex // 0..4
}

export default function AssessmentPage() {
	const [answers, setAnswers] = useState({})
	const [submitted, setSubmitted] = useState(false)

	const progress = useMemo(() => Math.round((Object.keys(answers).length / questions.length) * 100), [answers])

	function setAnswer(qid, idx) {
		setAnswers((prev) => ({ ...prev, [qid]: idx }))
	}

	function handleSubmit() {
		if (Object.keys(answers).length !== questions.length) return
		setSubmitted(true)
	}

	const result = useMemo(() => {
		const domainScores = { data: 0, web: 0, marketing: 0 }
		for (const q of questions) {
			const a = answers[q.id]
			if (typeof a !== 'number') continue
			const s = scoreMap(a)
			for (const k of Object.keys(q.weight)) {
				domainScores[k] += s * q.weight[k]
			}
		}
		const entries = Object.entries(domainScores)
		entries.sort((a, b) => b[1] - a[1])
		const top = entries[0]?.[0]
		let recommendation = 'Explore multiple paths to see what fits you best.'
		if (top === 'data') recommendation = 'Data Science with Python'
		if (top === 'web') recommendation = 'Web Development with JavaScript'
		if (top === 'marketing') recommendation = 'Digital Marketing'
		return { domainScores, recommendation }
	}, [answers])

	return (
		<Box>
			<Paper elevation={8} sx={{ p: 3 }}>
				<Typography variant="h5" sx={{ mb: 2 }}>Career Assessment</Typography>
				<LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
				{questions.map((q) => (
					<Box key={q.id} sx={{ mb: 2 }}>
						<Typography sx={{ mb: 1 }}>{q.text}</Typography>
						<RadioGroup
							row
							value={answers[q.id] ?? ''}
							onChange={(_, v) => setAnswer(q.id, Number(v))}
						>
							{q.options.map((opt, idx) => (
								<FormControlLabel key={opt} value={idx} control={<Radio />} label={opt} />
							))}
						</RadioGroup>
					</Box>
				))}
				<Button variant="contained" disabled={Object.keys(answers).length !== questions.length} onClick={handleSubmit}>Submit</Button>
				{submitted && (
					<Box sx={{ mt: 3 }}>
						<Divider sx={{ mb: 2 }}><Chip label="Results" /></Divider>
						<Alert severity="info" sx={{ mb: 2 }}>
							<Typography>Your recommended path: <strong>{result.recommendation}</strong></Typography>
						</Alert>
						<Typography variant="subtitle1" sx={{ mb: 1 }}>Scores</Typography>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							{Object.entries(result.domainScores).map(([k, v]) => (
								<Chip key={k} label={`${k}: ${v}`} color="primary" variant="outlined" />
							))}
						</Box>
						<CourseSection />
					</Box>
				)}
			</Paper>
		</Box>
	)
}

