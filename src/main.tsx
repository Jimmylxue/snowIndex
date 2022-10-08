import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@stores/store'
import 'antd/dist/antd.css'
import './index.css'
import './assets/css/font.css'
// import 'nes.css/css/nes.min.css'

function Home() {
	return <div>hello world</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
)
