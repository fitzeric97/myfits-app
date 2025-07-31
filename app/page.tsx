'use client'

import { useState } from 'react'
import { Mail, Search, Star, Clock, ChevronRight, Shield, Zap } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#8B4513]">FITS</h1>
          <button 
            onClick={() => setShowSignup(true)}
            className="bg-[#4B9CD3] text-white px-4 py-2 rounded-lg hover:bg-[#3A8BC2] transition"
          >
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
            <button 
              onClick={() => setShowSignup(true)}
              className="bg-[#4B9CD3] text-white px-6 py-3 rounded-lg hover:bg-[#3A8BC2] transition font-semibold"
            >
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
              <div className="w-16 h-16 bg-[#4B9CD3]/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-[#4B9CD3]" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#3E2723]">Dedicated Fashion Inbox</h4>
              <p className="text-[#795548]">Keep your personal email clean while never missing a sale from your favorite brands.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#4B9CD3]/10 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#4B9CD3]" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#3E2723]">Smart Organization</h4>
              <p className="text-[#795548]">Automatically grouped by brand with discount percentages and expiration dates at a glance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#4B9CD3]/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-[#4B9CD3]" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#3E2723]">Expiration Alerts</h4>
              <p className="text-[#795548]">See what's expiring soon right on your dashboard. No more "expired yesterday" disappointments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-[#3E2723] mb-6">
            Ready to organize your shopping life?
          </h3>
          <p className="text-xl text-[#795548] mb-8">
            Join thousands of shoppers who've already simplified their promotional emails with FITS.
          </p>
          <button 
            onClick={() => setShowSignup(true)}
            className="bg-[#4B9CD3] text-white px-8 py-4 rounded-lg hover:bg-[#3A8BC2] transition text-lg font-semibold"
          >
            Claim Your FITS Email →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3E2723] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">© 2025 FITS. Made with ❤️ for shoppers who love a good deal.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-[#4B9CD3]">Privacy Policy</a>
            <a href="#" className="hover:text-[#4B9CD3]">Terms of Service</a>
            <a href="#" className="hover:text-[#4B9CD3]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
