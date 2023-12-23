import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { SessionProvider } from './context/UserContext';
import { MenuProvider } from './context/menuContext';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';
import Movements from './pages/Movements';
import Books from './pages/Books';
import Employees from './pages/Employees';

function App() {
  return (
    <>
      <SessionProvider>
      <MenuProvider>
        <Router>
          <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/accounts' element={<Accounts />}/>
              <Route path='/movements' element={<Movements />}/>
              <Route path='/books' element={<Books />}/>
              <Route path='/employees' element={<Employees />}/>
          </Routes>
        </Router>
      </MenuProvider>
      </SessionProvider>
    </>
  )
}

export default App
