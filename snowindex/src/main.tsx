import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './index.css'

function Home() {
	return <div>hello world</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		{/* <App /> */}
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	</React.StrictMode>
)
