import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { SessionProvider } from './context/UserContext';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <SessionProvider>
        <Router>
          <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/accounts' element={<Accounts />}/>
          </Routes>
        </Router>
      </SessionProvider>
    </>
  )
}

export default App
