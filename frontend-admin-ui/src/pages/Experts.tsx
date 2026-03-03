import { useState } from 'react'
import { useEffect } from "react";

import { 
  UserCircle, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  Calendar, 
  Star, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Users,
  Award,
  Shield
} from 'lucide-react'
import Card from '../components/Card'
import { useAuth } from '../contexts/AuthContext'

type ExpertStatus = 'active' | 'inactive' | 'on-leave' | 'pending'
type ExpertSpecialty = 'psychology' | 'psychiatry' | 'counseling' | 'therapy' | 'coaching'

interface Expert {
  id: string
  name: string
  title: string
  email: string
  phone: string
  status: ExpertStatus
  specialty: ExpertSpecialty[]
  rating: number
  patients: number
  joinedDate: string
  nextAvailable: string
  avatar?: string
}

export default function Experts() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<ExpertStatus | 'all'>('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState<ExpertSpecialty | 'all'>('all')



  const [experts, setExperts] = useState<Expert[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchExperts = async () => {
    try {
         console.log("Fetching experts..."); // Add this
       const res=await fetch ("https://nila-backend-yzem.onrender.com/experts");
      //const res = await fetch("http://localhost:5000/experts");
            console.log("Response status:", res.status); // Add this

            if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
   console.log("Received data:", data); // Add this
   
      // Convert backend data to match your UI format
      const formatted = data.map((expert: any) => ({
        id: expert.id.toString(),
        name: expert.name,
        title: expert.title,
        email: expert.email,
        phone: expert.phone,
        status: expert.status,
        specialty: expert.specialty.split(",").map((s: string) => s.trim()),
        rating: Number(expert.rating),
        patients: Number(expert.patient),
        joinedDate: expert.joineddate,
        nextAvailable: expert.nextavailable,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          expert.name
        )}&background=0ea5e9&color=fff&bold=true`,
      }));

      setExperts(formatted);
    } catch (error) {
      console.error("Failed to fetch experts:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchExperts();
}, []);



  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    'on-leave': 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }

  const specialtyColors = {
    psychology: 'bg-purple-50 text-purple-700 border-purple-200',
    psychiatry: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    counseling: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    therapy: 'bg-pink-50 text-pink-700 border-pink-200',
    coaching: 'bg-amber-50 text-amber-700 border-amber-200'
  }

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || expert.status === selectedStatus
    const matchesSpecialty = selectedSpecialty === 'all' || expert.specialty.includes(selectedSpecialty)
    
    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const stats = [
    { label: 'Total Experts', value: experts.length, color: 'bg-blue-500', icon: Users },
    { label: 'Active Now', value: experts.filter(e => e.status === 'active').length, color: 'bg-green-500', icon: CheckCircle },
    { label: 'On Leave', value: experts.filter(e => e.status === 'on-leave').length, color: 'bg-blue-400', icon: Calendar },
    { label: 'Pending', value: experts.filter(e => e.status === 'pending').length, color: 'bg-yellow-500', icon: Shield },
  ]

  const getStatusIcon = (status: ExpertStatus) => {
    switch(status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'inactive': return <XCircle className="h-4 w-4" />
      case 'on-leave': return <Calendar className="h-4 w-4" />
      case 'pending': return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experts Management</h1>
          <p className="text-gray-600 mt-1">Manage therapists, psychologists, and counselors</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Export List
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center shadow-lg hover:shadow-xl transition-all">
            <Plus className="h-5 w-5 mr-2" />
            Add New Expert
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Updated just now</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialty, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ExpertStatus | 'all')}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Specialty Filter */}
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value as ExpertSpecialty | 'all')}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Specialties</option>
              <option value="psychology">Psychology</option>
              <option value="psychiatry">Psychiatry</option>
              <option value="counseling">Counseling</option>
              <option value="therapy">Therapy</option>
              <option value="coaching">Coaching</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <Card key={expert.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              {/* Expert Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=0ea5e9&color=fff&bold=true`
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{expert.name}</h3>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                    <p className="text-xs text-gray-500">{expert.id}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Status & Rating */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColors[expert.status]}`}>
                  {getStatusIcon(expert.status)}
                  <span className="ml-1 capitalize">{expert.status}</span>
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="ml-1 text-sm font-medium text-gray-900">{expert.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">({expert.patients})</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600 truncate">{expert.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{expert.phone}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expert.specialty.map((spec) => (
                    <span 
                      key={spec}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border ${specialtyColors[spec]}`}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Next Available</p>
                    <p className="text-sm font-medium text-gray-900">{expert.nextAvailable}</p>
                  </div>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-500">
                  Joined {new Date(expert.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Profile">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredExperts.length === 0 && (
        <Card className="text-center py-12">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <UserCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No experts found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            No experts match your current filters. Try adjusting your search or filters.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedStatus('all')
              setSelectedSpecialty('all')
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear all filters
          </button>
        </Card>
      )}

      {/* Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Experts by Status</h3>
          <div className="space-y-4">
            {Object.entries(statusColors).map(([status, colorClass]) => {
              const count = experts.filter(e => e.status === status).length
              const percentage = (count / experts.length) * 100
              return (
                <div key={status} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize font-medium text-gray-700">{status.replace('-', ' ')}</span>
                    <span className="text-gray-900 font-semibold">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${colorClass.split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Rated Experts</h3>
          <div className="space-y-4">
            {[...experts]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((expert) => (
                <div key={expert.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={expert.avatar} 
                        alt={expert.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{expert.name}</p>
                      <p className="text-xs text-gray-500">{expert.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="font-semibold text-gray-900">{expert.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">rating</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Quick Add Section for Admin */}
      {user?.role === 'admin' && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Need to add a new expert?</h3>
              <p className="text-gray-600 mt-1">
                Quickly add new therapists, psychologists, or counselors to your team.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                Download Template
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center shadow-lg hover:shadow-xl transition-all">
                <Plus className="h-5 w-5 mr-2" />
                Bulk Upload
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
