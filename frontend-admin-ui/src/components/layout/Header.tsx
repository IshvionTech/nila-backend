import { Menu, Bell, Search, HelpCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Search Bar */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments, reports..."
              className="pl-10 pr-4 py-2 w-64 lg:w-80 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Help Button */}
          <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors hidden md:block">
            <HelpCircle className="h-5 w-5" />
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


// import { Menu, Bell } from 'lucide-react'
// import { useAuth } from '../../contexts/AuthContext'

// export default function Header() {
//   const { user } = useAuth()

//   return (
//     // <header className="bg-white shadow-sm z-10">
//     <header className="h-16 bg-white border-b flex items-center px-6">

//       <div className="flex justify-between items-center px-4 py-3 sm:px-6 lg:px-8">
//         <div className="flex items-center">
//           <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
//             <Menu className="h-6 w-6" />
//           </button>
//           <div className="ml-4">
//             <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
//             <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
//             <Bell className="h-6 w-6" />
//           </button>
          
//           <div className="flex items-center">
//             <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
//               <span className="text-primary-600 font-semibold">
//                 {user?.name?.charAt(0).toUpperCase()}
//               </span>
//             </div>
//             <div className="ml-3 hidden md:block">
//               <p className="text-sm font-medium text-gray-700">{user?.name}</p>
//               <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }