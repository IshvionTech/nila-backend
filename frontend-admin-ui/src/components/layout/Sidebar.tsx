import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  Calendar, 
  CreditCard, 
  Settings,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'therapist', 'front_desk'] },
  { name: 'Users', href: '/users', icon: Users, roles: ['admin', 'manager'] },
  { name: 'Experts', href: '/experts', icon: UserCircle, roles: ['admin', 'manager'] },
  { name: 'Appointments', href: '/appointments', icon: Calendar, roles: ['admin', 'manager', 'therapist', 'front_desk'] },
  { name: 'Payments', href: '/payments', icon: CreditCard, roles: ['admin', 'manager'] },
  { name: 'Settings', href: '#', icon: Settings, roles: ['admin'] },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  const canSee = (roles: string[]) => {
    return roles.includes(user?.role || '')
  }

  return (
    // <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <div className="hidden md:flex w-64 flex-col bg-white border-r">

      <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-primary-600">Mental Health Clinic</h1>
        </div>
        <div className="mt-8 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              canSee(item.roles) && (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }: { isActive: boolean }) => // Add type annotation
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              )
            ))}
          </nav>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <button
                onClick={logout}
                className="ml-auto p-2 text-gray-400 hover:text-gray-500"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}