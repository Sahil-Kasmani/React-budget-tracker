import './App.css';
import Authentication from './components/Authentication';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Authentication />}>
          </Route>
          <Route path='/Login' element={<Login />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
