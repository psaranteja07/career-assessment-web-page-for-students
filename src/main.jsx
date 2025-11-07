import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App.jsx'
import { AuthProvider } from './state/AuthContext.jsx'
import './styles.css'

const theme = createTheme({
	palette: {
		primary: { main: '#4567b7' },
		background: { default: '#4567b7' },
	},
	typography: {
		fontFamily: 'Inter, Roboto, Arial, sans-serif',
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
)

