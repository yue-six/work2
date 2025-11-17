import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

import Login from './pages/Login'
import Profile from './pages/Profile'
import { SupabaseProvider } from './context/SupabaseContext'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <SupabaseProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SupabaseProvider>
    </ErrorBoundary>
  )
}

export default App