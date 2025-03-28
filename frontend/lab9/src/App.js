import './App.css';
import Login from './login.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Predictor from './predictor.js';

function App() {
return(<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/predict" element={<Predictor />} />
      </Routes>
    </Router>
)
}
export default App;
