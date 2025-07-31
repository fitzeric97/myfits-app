'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#8B4513]">FITS</h1>
          <button className="bg-[#4B9CD3] text-white px-4 py-2 rounded-lg hover:bg-[#3A8BC2] transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-[#3E2723] mb-6">
          Your promotions.<br />Organized. Finally.
        </h2>
        <p className="text-xl text-[#795548] mb-8 max-w-2xl mx-auto">
          Stop drowning in retail emails. FITS gives you a dedicated inbox for all your fashion deals — 
          organized by brand, searchable, and only there when you want them.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-[#4B9CD3] text-white px-6 py-3 rounded-lg hover:bg-[#3A8BC2] transition font-semibold">
              Get Started →
            </button>
          </div>
          <p className="text-sm text-[#795548] mt-3">
            Join 1,000+ shoppers • No credit card required
          </p>
        </div>
      </div>

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
