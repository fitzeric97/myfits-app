'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState('')

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem('fits_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    checkUser()
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        // Login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        
        const data = await response.json()
        
        if (response.ok) {
          localStorage.setItem('fits_user', JSON.stringify(data.profile))
          setUser(data.profile)
          setShowAuth(false)
          setMessage(`Welcome back! Your FITS email: ${data.profile.fits_email}`)
        } else {
          setMessage(data.error || 'Login failed')
        }
      } else {
        // Signup
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, firstName, lastName })
        })
        
        const data = await response.json()
        
        if (response.ok) {
          setMessage(`Account created! Your FITS email: ${data.fitsEmail}. Please login.`)
          setIsLogin(true)
          // Clear form
          setFirstName('')
          setLastName('')
          setPassword('')
        } else {
          setMessage(data.error || 'Signup failed')
        }
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('fits_user')
    setUser(null)
    setMessage('Logged out successfully')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#8B4513]">FITS</h1>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#795548]">{user.fits_email}</span>
              <button 
                onClick={handleLogout}
                className="text-[#8B4513] hover:text-[#6B3410] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="bg-[#4B9CD3] text-white px-4 py-2 rounded-lg hover:bg-[#3A8BC2] transition"
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* Message Banner */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 text-center">
          {message}
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-[#3E2723] mb-6">
          Your promotions.<br />Organized. Finally.
        </h2>
        <p className="text-xl text-[#795548] mb-8 max-w-2xl mx-auto">
          Stop drowning in retail emails. FITS gives you a dedicated inbox for all your fashion deals — 
          organized by brand, searchable, and only there when you want them.
        </p>
        
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-[#3E2723] mb-2">Welcome, {user.first_name}!</h3>
            <p className="text-[#795548] mb-4">Your FITS email:</p>
            <p className="text-lg font-mono bg-[#FFF8E7] p-3 rounded">{user.fits_email}</p>
            <p className="text-sm text-[#795548] mt-4">
              Forward your promotional emails to this address to get started!
            </p>
          </div>
        ) : (
          <button 
            onClick={() => setShowAuth(true)}
            className="bg-[#4B9CD3] text-white px-8 py-4 rounded-lg hover:bg-[#3A8BC2] transition text-lg font-semibold"
          >
            Claim Your FITS Email →
          </button>
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <h3 className="text-2xl font-bold text-[#3E2723] mb-6">
              {isLogin ? 'Welcome Back' : 'Get Your FITS Email'}
            </h3>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]"
                    required
                  />
                </div>
              )}
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]"
                required
              />
              
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]"
                minLength={6}
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4B9CD3] text-white py-3 rounded-lg hover:bg-[#3A8BC2] transition disabled:opacity-50"
              >
                {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
              </button>
            </form>
            
            {message && (
              <p className="mt-4 text-sm text-center text-red-600">{message}</p>
            )}
            
            <p className="text-center mt-4 text-sm text-[#795548]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#4B9CD3] hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
            
            <button
              onClick={() => {
                setShowAuth(false)
                setMessage('')
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-[#3E2723] mb-12">
            Everything you need. Nothing you don't.
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#4B9CD3]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#3E2723] text-center">Dedicated Fashion Inbox</h4>
              <p className="text-[#795548] text-center">Keep your personal email clean while never missing a sale.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#4B9CD3]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#3E2723] text-center">Smart Organization</h4>
              <p className="text-[#795548] text-center">Automatically grouped by brand with discounts at a glance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#4B9CD3]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#3E2723] text-center">Expiration Alerts</h4>
              <p className="text-[#795548] text-center">Never miss a deal with timely expiration notifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3E2723] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2025 FITS. Made with ❤️ for shoppers who love a good deal.</p>
        </div>
      </footer>
    </div>
  )
}
