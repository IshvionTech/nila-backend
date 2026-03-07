import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Smartphone, Shield, Heart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!phone || !otp) {
      setError('Phone number and OTP are required')
      return
    }

    try {
      setLoading(true)
      await login(phone, otp, rememberMe)
      navigate('/dashboard')
    } catch {
      setError('Invalid OTP or phone number')
    } finally {
      setLoading(false)
    }
  }


const handleRequestOTP = async () => {
  if (!phone) {
    setError('Please enter a valid phone number')
    return
  }

  try {
    setLoading(true)

    const API_URL = import.meta.env.VITE_API_URL;
    
    console.log("API_URL:", API_URL);  

    await fetch(`${API_URL}/auth/request-otp`, {
      
   //await fetch("https://nila-backend-yzem.onrender.com/auth/request-otp",{
    //await fetch("http://localhost:5000/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    setShowOTP(true)
  } catch {
    setError("Failed to send OTP")
  } finally {
    setLoading(false)
  }
}

  // const handleRequestOTP = () => {
  //   if (!phone) {
  //     setError('Please enter a valid phone number')
  //     return
  //   }
  //   setShowOTP(true)
  //   setError('')
  //   // Simulate sending OTP
  //   setTimeout(() => {
  //     alert(`OTP (123456) has been sent to ${phone}. This is a demo.`)
  //   }, 1000)
  // }




  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 z-10 border border-white/20">
        
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mental Health Clinic
          </h1>
          <p className="text-gray-600 mt-2">
            Secure Admin Panel Login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center">
              <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                disabled={loading || showOTP}
              />
            </div>
          </div>

          {/* OTP Section - Animated Entrance */}
          {showOTP && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <span className="text-xs text-gray-500">Valid for 10 minutes</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-center text-2xl tracking-widest"
                  disabled={loading}
                  maxLength={6}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            {!showOTP ? (
              <button
                type="button"
                onClick={handleRequestOTP}
                disabled={!phone || loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowOTP(false)}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  disabled={loading}
                >
                  ← Change phone number
                </button>
              </>
            )}
          </div>

          {/* Remember Me & Demo Note */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={loading}
              />
              <span className="text-sm text-gray-600">
                Keep me logged in
              </span>
            </label>
            <div className="text-right">
              <span className="text-xs text-gray-500">
                Demo: Use 123456 as OTP
              </span>
            </div>
          </div>

          {/* Security Note */}
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              <Shield className="inline h-3 w-3 mr-1" />
              Your data is protected with bank-level security
            </p>
          </div>
        </form>
      </div>

      {/* Add animation styles */}
      {/* <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style> */}
    </div>
  )
}

