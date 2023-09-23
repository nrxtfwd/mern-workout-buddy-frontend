import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;