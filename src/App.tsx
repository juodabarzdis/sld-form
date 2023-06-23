import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form } from './components/Form/Form';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Form />} />
			<Route path="/error" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
