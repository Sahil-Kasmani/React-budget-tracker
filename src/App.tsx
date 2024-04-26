import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authentication, Login, Dashboard } from './index';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Authentication />}>
          </Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
