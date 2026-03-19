import { Users, UserCircle, Calendar, DollarSign, TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";
import Card from "../components/Card";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Dashboard() {
  const { user } = useAuth();

  const [statsData, setStatsData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [overview, setOverview] = useState<any[]>([]);

  // Get icon based on activity
  const getActivityIcon = (action: string) => {
    if (action?.includes("Appointment")) return Calendar;
    if (action?.includes("User")) return Users;
    if (action?.includes("Expert")) return UserCircle;
    return Activity;
  };

  const typeColors = {
    therapy: 'bg-indigo-50 text-indigo-700',
    consultation: 'bg-cyan-50 text-cyan-700',
    'follow-up': 'bg-emerald-50 text-emerald-700',
    assessment: 'bg-amber-50 text-amber-700'
  }

  // Dashboard stats
  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/stats`)
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch((err) => console.error(err));
  }, []);

  // Activity logs
  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/activity`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error(err));
  }, []);

  // Upcoming appointments
  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/upcoming`)
      .then((res) => res.json())
      .then((data) => setUpcoming(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/api/dashboard/availability`)
      .then((res) => res.json())
      .then((data) => setAvailability(data))
      .catch((err) => console.error(err));
  }, []);

  // Appointment overview chart
  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/overview`)
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch((err) => console.error(err));
  }, []);

  const stats = statsData
    ? [
        {
          name: "Total Users",
          value: statsData.totalUsers,
          icon: Users,
          change: "+12%",
          iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
          trend: "up",
        },
        {
          name: "Total Experts",
          value: statsData.totalExperts,
          icon: UserCircle,
          change: "+5%",
          iconBg: "bg-gradient-to-br from-emerald-500 to-green-400",
          trend: "up",
        },
        {
          name: "Today's Appointments",
          value: statsData.todayAppointments,
          icon: Calendar,
          change: "-3%",
          iconBg: "bg-gradient-to-br from-violet-500 to-purple-400",
          trend: "down",
        },
        {
          name: "Revenue",
          value: `₹ ${statsData.revenue}`,
          icon: DollarSign,
          change: "+18%",
          iconBg: "bg-gradient-to-br from-amber-500 to-yellow-400",
          trend: "up",
        },
      ]
    : [];
const chartData = overview.map((item) => ({
  date: new Date(item.date).toLocaleDateString(),
  appointments: Number(item.count),
}));


  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your clinic today.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <Activity className="w-4 h-4 mr-1" />
            Last updated: Just now
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>

                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.name}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Appointments Overview
            </h2>
            <div className="w-full h-[300px]">
              {chartData.length> 0 && (
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="date" />
                 <YAxis />
                 <Tooltip />
                 <Bar dataKey="appointments" fill="#3b82f6" radius={[4,4,0,0]} />
                 </BarChart>
              </ResponsiveContainer>  
              )}         
            </div>
          </Card>  

            {/* <div className="flex items-end justify-between h-48">
              {overview.map((item, index) => {
                const height = Number(item.count) * 20;

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${height}px` }}
                    ></div>

                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div> */}
        </div>

        {/* Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Activity
            </h2>

            <Clock className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.action);

              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {activity.action}
                    </p>

                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Upcoming appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {upcoming
              .filter(a => a.status === 'scheduled' || a.status === 'confirmed')
              .slice(0, 4)
              .map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${typeColors[apt.type as keyof typeof typeColors] || 'bg-gray-100'}`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{apt.patientName || 'N/A'}</p>
                      <p className="text-xs text-gray-500">with {apt.therapistName || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{apt.time || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{apt.date || 'N/A'}</p>
                  </div>
                </div>
              ))}
            {upcoming.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </Card>
        {/* <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Upcoming Appointments
          </h2>

          <div className="space-y-4">
            {upcoming.map((appt) => (
              <div key={appt.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{appt.patientName}</p>
                  <p className="text-sm text-gray-500">
                    {appt.sessionType}
                  </p>
                </div>

                <div className="text-right">
                  <p>{appt.time}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card> */}

        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Expert Availability
          </h2>

          <div className="space-y-4">
            {availability.map((expert) => (
              <div key={expert.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{expert.expertName}</p>
                  <p className="text-sm text-gray-500">
                    {expert.specialization}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    expert.isAvailable === true || expert.isAvailable === "true" || expert.isAvailable === 1
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {expert.isAvailable=== true || expert.isAvailable === "true" || expert.isAvailable === 1
                   ? "Available" : "Not Available"}
                </span>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}


// import { Users, UserCircle, Calendar, DollarSign, TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react'
// import Card from '../components/Card'
// import { useAuth } from '../contexts/AuthContext'
// import { useState, useEffect } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Dashboard() {
//   const { user } = useAuth()

//   const [statsData, setStatsData] = useState<any>(null);
//   const [activities, setActivities] = useState<any[]>([]);
//   const [upcoming, setUpcoming] = useState<any[]>([]);
//   const [availability, setAvailability] = useState<any[]>([]);
//   const [overview, setOverview] = useState<any[]>([]);


// // Dashboard stats
//   useEffect(() => {
//     fetch(`${API_URL}/api/dashboard/stats`)
//     //fetch("https://nila-backend-yzem.onrender.com/api/dashboard/stats")
//    // fetch("http://localhost:5000/api/dashboard/stats")
//       .then(res => res.json())
//       .then(data => setStatsData(data))
//       .catch(err => console.error(err));
//   }, []);

//   // Activity logs
//   useEffect(() => {
//   fetch(`${API_URL}/api/dashboard/activity`)
//     .then(res => res.json())
//     .then(data => setActivities(data));
//     .catch(err => console.error(err));
//   }, []);

//   // Upcoming + availability
// useEffect(() => {
//   fetch(`${API_URL}/api/dashboard/upcoming`)
//   //fetch("https://nila-backend-yzem.onrender.com/api/dashboard/upcoming")
//   //fetch("http://localhost:5000/api/dashboard/upcoming")
//     .then(res => res.json())
//     .then(data => setUpcoming(data));
//     .catch((err) => console.error(err));

//     fetch(`${API_URL}/api/dashboard/availability`)
//    // fetch("https://nila-backend-yzem.onrender.com/api.dashboard/availability")
//   //fetch("http://localhost:5000/api/dashboard/availability")
//     .then(res => res.json())
//     .then(data => setAvailability(data));
//     .catch((err) => console.error(err));
// }, []);


//   // Overview
// useEffect(() => {
//     fetch(`${API_URL}/api/dashboard/overview`)
//   //fetch("https://nila-backend-yzem.onrender.com/api/dashboard/overview")
//   //fetch("http://localhost:5000/api/dashboard/overview")
//     .then(res => res.json())
//     .then(data => setOverview(data));
//     .catch((err) => console.error(err));
// }, []);

//   // Get icon based on activity
// const getActivityIcon = (action: string) => {
//   if (action.includes("Appointment")) return Calendar;
//   if (action.includes("User")) return Users;
//   if (action.includes("Expert")) return UserCircle;
//   return Activity;
// };


//   const stats = statsData ? [
//     {
//       name: "Total Users",
//       value: statsData.totalUsers,
//       icon: Users,
//       change: "+12%",
//       iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
//       trend: "up"
//     },
//     {
//       name: "Total Experts",
//       value: statsData.totalExperts,
//       icon: UserCircle,
//       change: "+5%",
//       iconBg: "bg-gradient-to-br from-emerald-500 to-green-400",
//       trend: "up"
//     },
//     {
//       name: "Today's Appointments",
//       value: statsData.todayAppointments,
//       icon: Calendar,
//       change: "-3%",
//       iconBg: "bg-gradient-to-br from-violet-500 to-purple-400",
//       trend: "down"
//     },
//     {
//       name: "Revenue",
//       value: `₹ ${statsData.revenue}`,
//       icon: DollarSign,
//       change: "+18%",
//       iconBg: "bg-gradient-to-br from-amber-500 to-yellow-400",
//       trend: "up"
//     }
//   ] : [];


//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
//           <p className="text-gray-600 mt-1">Here's what's happening with your clinic today.</p>
//         </div>
//         <div className="mt-4 md:mt-0">
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//             <Activity className="w-4 h-4 mr-1" />
//             Last updated: Just now
//           </span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <Card key={stat.name} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//             <div className="p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`${stat.iconBg} p-3 rounded-xl shadow-lg`}>
//                   <stat.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {stat.trend === 'up' ? (<TrendingUp className="h-3 w-3 mr-1" />) : (<TrendingDown className="h-3 w-3 mr-1" />)}
//                   {stat.change}
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
//               <p className="text-gray-600 text-sm">{stat.name}</p>
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <span className="text-xs text-gray-500">vs last month</span>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Charts and Tables Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Appointments Overview */}
//         <div className="lg:col-span-2">
//           <Card className="h-full">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-900">Appointments Overview</h2>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
//                   This Week
//                 </button>
//                 <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
//                   This Month
//                 </button>
//               </div>
//             </div>
//             <div className="h-64 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
//               <div className="relative w-full h-full p-4">
//                 {/* Mock Chart Bars */}
//                 <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48 px-8">
//                   {overview.map((item, index) => {
//   const height = Number(item.count) * 20; // multiply to make visible

//   return (
//     <div key={index} className="flex flex-col items-center">
//       <div 
//         className="w-8 rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-300 transition-all duration-300 hover:opacity-80"
//         style={{ height: `${height}px` }}
//       ></div>
//       <span className="mt-2 text-xs text-gray-500">
//         {new Date(item.date).toLocaleDateString()}
//       </span>
//     </div>
//   );
// })}
//                   {/* {[40, 60, 80, 65, 90, 70, 85].map((height, index) => (
//                     <div key={index} className="flex flex-col items-center">
//                       <div 
//                         className="w-8 rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-300 transition-all duration-300 hover:opacity-80"
//                         style={{ height: `${height}%` }}
//                       ></div>
//                       <span className="mt-2 text-xs text-gray-500">Day {index + 1}</span>
//                     </div>
//                   ))} */}
//                 </div>
//               </div>
//               <div className="text-center px-6 pb-4">
//                 <p className="text-gray-600">📈 Appointment trends are looking positive this week!</p>
//               </div>
//             </div>
//           </Card>
//         </div>



//  {/* Activity */}
//         <Card>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900">
//               Recent Activity
//             </h2>

//             <Clock className="h-5 w-5 text-gray-400" />
//           </div>

//           <div className="space-y-4">
//             {activities.map((activity) => {
//               const Icon = getActivityIcon(activity.action);

//               return (
//                 <div key={activity.id} className="flex items-start space-x-3">
//                   <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                     <Icon className="h-5 w-5 text-blue-600" />
//                   </div>

//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">
//                       {activity.action}
//                     </p>

//                     <p className="text-xs text-gray-500">{activity.time}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>
//       </div>


//         {/* Recent Activity */}
//         {/* <Card className="h-full">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>

//             <Clock className="h-5 w-5 text-gray-400" />
//           </div>
//           <div className="space-y-4">
//             {activities.map((activity) => (
//               <div 
//                 key={activity.id} 
//                 className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
//               >
//                 <div className="flex-shrink-0">
//                   <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <Activity className="h-5 w-5 text-blue-600" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
//                   <div className="flex items-center mt-1">
//                     <span className="text-xs text-gray-500">{activity.time}</span>
//                     <div className="ml-2 h-1 w-1 rounded-full bg-gray-300"></div>
//                     <span className="ml-2 text-xs text-blue-600 font-medium">View details</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <button className="w-full mt-4 py-2 text-center text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
//               View all activity
//             </button>
//           </div>
//         </Card>
//       </div> */}

//       {/* Quick Actions */}
//       {user?.role === 'admin' && (
//         <Card>
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <button className="flex flex-col items-center p-5 text-center border-2 border-gray-100 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group">
//               <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
//                 <UserCircle className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-gray-900">Add Expert</span>
//               <span className="text-xs text-gray-500 mt-1">Register new therapist</span>
//             </button>
//             <button className="flex flex-col items-center p-5 text-center border-2 border-gray-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 group">
//               <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
//                 <Calendar className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-gray-900">Schedule</span>
//               <span className="text-xs text-gray-500 mt-1">Create appointment</span>
//             </button>
//             <button className="flex flex-col items-center p-5 text-center border-2 border-gray-100 rounded-xl hover:border-violet-300 hover:bg-violet-50 transition-all duration-300 group">
//               <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
//                 <Users className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-gray-900">Manage Users</span>
//               <span className="text-xs text-gray-500 mt-1">User management</span>
//             </button>
//             <button className="flex flex-col items-center p-5 text-center border-2 border-gray-100 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group">
//               <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
//                 <DollarSign className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-gray-900">View Reports</span>
//               <span className="text-xs text-gray-500 mt-1">Financial reports</span>
//             </button>
//           </div>
//         </Card>
//       )}

//       {/* Upcoming Appointments Preview */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
//           <div className="space-y-4">
//             {upcoming.map((appt) => (
//   <div key={appt.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50 transition-colors">
//     <div className="flex items-center space-x-3">
//       <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
//         <UserCircle className="h-5 w-5 text-blue-600" />
//       </div>
//       <div>
//         <p className="font-medium text-gray-900">{appt.patientName}</p>
//         <p className="text-sm text-gray-500">{appt.sessionType}</p>
//       </div>
//     </div>
//     <div className="text-right">
//       <p className="font-medium text-gray-900">{appt.time}</p>
//       <p className="text-sm text-gray-500">
//         {new Date(appt.date).toLocaleDateString()}
//       </p>
//     </div>
//   </div>
// ))}
           
//           </div>
//         </Card>
        
//         <Card>
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Expert Availability</h2>
//           <div className="space-y-4">
//             {availability.map((expert) => (
//   <div key={expert.id} className="flex items-center justify-between">
//     <div className="flex items-center space-x-3">
//       <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
//         <UserCircle className="h-5 w-5 text-emerald-600" />
//       </div>
//       <div>
//         <p className="font-medium text-gray-900">{expert.expertName}</p>
//         <p className="text-sm text-gray-500">{expert.specialization}</p>
//       </div>
//     </div>

//     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//       expert.isAvailable 
//         ? "bg-green-100 text-green-800" 
//         : "bg-red-100 text-red-800"
//     }`}>
//       {expert.isAvailable ? "Available" : "Not Available"}
//     </span>
//   </div>
// ))}
       
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }
