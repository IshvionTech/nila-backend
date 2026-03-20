import { Users, UserCircle, Calendar, DollarSign, TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";
import {  CheckCircle, XCircle } from "lucide-react";
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
      .then((data) => {

        if (!Array.isArray(data)) {
      console.error("Invalid API response:", data);
      return;
    }

    const mapped = data.map((apt: any) => ({
      id: apt.id,
      patientName: apt.patientName,
      therapistName: apt.therapistName || "N/A",
      date: apt.date,
      time: apt.time,
      status: apt.status || "scheduled",
      type: apt.type || "consultation"
    }));
    setUpcoming(mapped);
  })
      //.then((data) => setUpcoming(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/api/dashboard/availability`)
      .then((res) => res.json())
      .then((data) => {

        if (!Array.isArray(data)) {
      console.error("Invalid Availability API:", data);
      return;
    }

    const mapped = data.map((exp: any) => ({
      id: exp.id,
      expertName: exp.expertName || exp.name,
      specialization: exp.specialization || exp.specialty,
      nextAvailable: exp.nextAvailable || exp.next_available,
      isAvailable: exp.status === "active"
    }));

    setAvailability(mapped);
  })
      
      //.then((data) => setAvailability(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
  console.log("Upcoming API Data:", upcoming);
}, [upcoming]);

useEffect(() => {
  console.log("Availability API:", availability);
}, [availability]);

useEffect(() => {
  console.log("Overview API:", overview);
}, [overview]);

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

const chartData = Array.isArray(overview)
  ? overview.map((item) => ({
      date: new Date(item.date).toLocaleDateString(),
      appointments: Number(item.count),
    }))
  : [];

const today = new Date().toISOString().split('T')[0];

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
            <div className="w-full h-[300px] min-h-[300px]">

               {/* DEBUG LINE */}
              <p>Chart Data Length: {chartData.length}</p>

              {chartData.length> 0 && (
              <ResponsiveContainer width="100%" height={300} >
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4"> Upcoming Appointments  </h3>
            <div className="space-y-4">
              {(() => {    
                const filteredAppointments = upcoming.filter(
          (a) =>  (a.status === "scheduled" || a.status === "confirmed") && a.date &&  new Date(a.date) >= new Date(today) ).slice(0, 4);

               if (filteredAppointments.length === 0) {
              return (
                 <p className="text-gray-500 text-center py-4"> No upcoming appointment  </p>
                     );
                   }
      return filteredAppointments.map((apt) => (
        <div  key={apt.id}
          className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50" >
          {/* Left */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
                typeColors[apt.type as keyof typeof typeColors] || "bg-gray-100" }`} >
                   <Calendar className="h-4 w-4" />
            </div>

            <div>
              <p className="font-medium text-gray-900">
                {apt.patientName || "N/A"}
              </p>
              <p className="text-xs text-gray-500">  with {apt.therapistName || "N/A"}  </p>
            </div>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {apt.time || "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {apt.date  ? new Date(apt.date).toISOString().split("T")[0] : "N/A"}
            </p>
          </div>
        </div>
      ));
    })()}
  </div>
</Card>

<Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6"> Expert Availability </h2>

      <div className="space-y-4">
        {availability.length === 0 && (
          <p className="text-gray-500 text-center py-4"> No expert data available </p>
        )}

        {availability.map((expert: any) => {
          const isAvailable = expert.isAvailable;

          return (
            <div
              key={expert.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-white">
              {/* LEFT */}
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {expert.expertName?.charAt(0) || "E"}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <p className="font-medium text-gray-900">
                    {expert.expertName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {expert.specialization || "No specialization"}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center space-x-3">
                {/* Next Available Time */}
                {expert.nextAvailable && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next Slot</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(expert.nextAvailable).toLocaleTimeString([], {
                   hour: "2-digit", minute: "2-digit"  })}
                    </p>
                  </div>
                )}

                {/* Status Badge */}
                <span
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                    isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isAvailable ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
        
      </div>
    </div>
  );
}
