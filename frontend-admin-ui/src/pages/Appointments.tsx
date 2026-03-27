import { useState, useEffect } from 'react'
import { Calendar, Clock, User, UserCircle, Filter, Search, Plus, CheckCircle, XCircle, Clock as ClockIcon, MoreVertical, Download } from 'lucide-react'
import Card from '../components/Card'
import { useAuth } from '../contexts/AuthContext'

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
type AppointmentType = 'therapy' | 'consultation' | 'follow-up' | 'assessment'

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  phone: string;  
  email: string;
  therapistName: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  type: AppointmentType;
  notes: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function Appointments() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | 'all'>('all')
  const [selectedDate, setSelectedDate] = useState<string>('today')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    phone: '',
    email: '',
    therapistName: '',
    date: '',
    time: '',
    duration: 60,
    status: 'scheduled' as AppointmentStatus,
    type: 'consultation' as AppointmentType,
    notes: ''
  })

const fetchAppointments = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/api/appointments`);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    console.log("API DATA:", data);

    const mappedData = Array.isArray(data)
      ? data.map((apt: any) => ({
          id: apt.id,
          patientName: apt.patient_name || '',
          patientId: apt.patient_id || '',
          phone: apt.phone || '',
          email:apt.email || '',
          therapistName: apt.therapist_name || '',
          date: apt.appointment_date || '',

          displayDate: apt.appointment_date
            ? new Date(apt.appointment_date).toLocaleDateString('en-IN')
            : '',
          time: apt.appointment_time
            ? apt.appointment_time.slice(0, 5)
            : '',
          duration: apt.duration || 0,
          status: apt.status || 'scheduled',
          type: apt.type || 'therapy',
          notes: apt.notes || ''
        }))
      : [];

    setAppointments(mappedData);
  } catch (err) {
    console.error("Error fetching appointments:", err);
  } finally {
    setLoading(false);
  }
};

  // const fetchAppointments = async () => {
  //   setLoading(true)
  //   try {
  //     const res = await fetch(`${API_URL}/api/appointments`)
  //     //const res = await fetch("https://nila-backend-yzem.onrender.com/api/appointment")
  //    // const res = await fetch("http://localhost:5000/api/appointments")
  //     if (!res.ok) throw new Error('Failed to fetch')
  //     const data = await res.json()
      
  //     // Map snake_case from backend to camelCase for frontend
  //     const mappedData = data.map((apt: any) => {
  //      //   const dateObj = apt.appointment_date
  //      //    ? new Date(
  //      //   Number(apt.appointment_date) < 10000000000
  //      //    ? Number(apt.appointment_date) * 1000
  //      //     : Number(apt.appointment_date)
  //      //   )
  //      // : null;
  //   return {
  //       id: apt.id,
  //       patientName: apt.patient_name || '',
  //       patientId: apt.patient_id || '',
  //       therapistName: apt.therapist_name || '',
  //       date: apt.appointment_date || '',
  //       time: apt.appointment_time
  //         ? apt.appointment_time.substring(0, 5)
  //          : '',

  //       // date: dateObj
  //     //? dateObj.toLocaleDateString('en-IN', {
  //       //  day: '2-digit',
  //         //month: 'short',
  //         //year: 'numeric'
  //       //})
  //     //: '',

  //   // time: dateObj
  //   //   ? dateObj.toLocaleTimeString('en-IN', {
  //   //       hour: '2-digit',
  //   //       minute: '2-digit'
  //   //     })
  //   //   : '',

  //       // date: apt.appointment_date ? apt.appointment_date.split('T')[0] : '',
  //       //time: apt.appointment_time ? apt.appointment_time.substring(0, 5) : '',

  //       duration: apt.duration || 0,
  //       status: apt.status || 'scheduled',
  //       type: apt.type || 'therapy',
  //       notes: apt.notes || ''
  //     };
  //     });
  //     //setAppointments((prev) => [...prev, mappedData]);
  //     setAppointments(mappedData)
  //   } catch (err) {
  //     console.error("Error fetching appointments:", err)
  //   } finally {
  //     setLoading(false)
  //   }
  // };

    // Fetch appointments
  useEffect(() => {
    fetchAppointments()
  }, []);


   // ✅ Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const [showOtpModal, setShowOtpModal] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

if(!/^\d{10}$/.test(formData.phone))  {
  alert("Enter valid phone number");
  return;
}

  try {
        console.log("Sending OTP...");
    // ✅ STEP 1: SEND OTP
    const res = await fetch(`${API_URL}/api/appointments/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({  email: formData.email    

         })
    });

     console.log("Response status:", res.status);

       const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) throw new Error(data.message || "Failed to send OTP");

        alert("OTP Sent ✅");

    // 👉 Open OTP popup
    setShowOtpModal(true);
    setShowModal(false); 
  } catch (err) {
    console.error("ERROR:", err);
    alert("Failed to send OTP");
  }
};

const [otp, setOtp] = useState("");

const handleVerifyOtp = async () => {
  try {
    // ✅ STEP 2: VERIFY OTP
    const res = await fetch(`${API_URL}/api/appointments/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        otp: otp
      })
    });

    if (!res.ok) throw new Error("Invalid OTP");

    // ✅ STEP 3: CREATE APPOINTMENT
    await createAppointment();

    alert("Appointment created successfully!");
    setShowOtpModal(false);
    setOtp("");          // clear OTP

  } catch (err) {
    console.error(err);
    alert("Invalid or expired OTP");
  }
};


const createAppointment = async () => {
  const newAppointment = {
    patient_name: formData.patientName,
    patient_id: formData.patientId,
    phone: formData.phone,
    email:formData.email,
    therapist_name: formData.therapistName,
    appointment_date: formData.date,
    appointment_time: formData.time,
    duration: Number(formData.duration) || 0,
    status: formData.status,
    type: formData.type,
    notes: formData.notes
  };

  const res = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAppointment)
  });

  if (!res.ok) throw new Error("Failed to create appointment");

  // refresh list
  await fetchAppointments();
};





//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const newAppointment = {
//       patient_name: formData.patientName,
//       patient_id: formData.patientId,
//       phone: formData.phone,
//       therapist_name: formData.therapistName,
//       appointment_date: formData.date,
//       appointment_time: formData.time,
//       duration: Number(formData.duration) || 0,
//       status: formData.status,
//       type: formData.type,
//       notes: formData.notes
//     };

//     const res = await fetch(`${API_URL}/api/appointments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newAppointment)
//     });

//     if (!res.ok) throw new Error('Failed to create appointment');

//     alert("Appointment created successfully!");

//     // ✅ BEST WAY
//     await fetchAppointments();

//   } catch (err) {
//     console.error(err);
//     alert("Failed to create appointment.");
//   }
// };


  // const handleSubmit = async (e: React.FormEvent) => {
  //    e.preventDefault();
  //   try {
  //     // Map frontend camelCase to backend snake_case
  //     const newAppointment = {
  //       patient_name: formData.patientName,
  //       patient_id: formData.patientId,
  //       phone: formData.phone,
  //       therapist_name: formData.therapistName,
  //       appointment_date: formData.date,
  //       appointment_time: formData.time,
  //       duration: formData.duration  ? Number(formData.duration) : 0,
  //       status: formData.status,
  //       type: formData.type,
  //       notes: formData.notes
  //     };

  //     const res = await fetch(`${API_URL}/api/appointments`,{
  //     // const res = await fetch("https://nila-backend-yzem.onrender.com/api/appointments",{
  //    // const res = await fetch("http://localhost:5000/api/appointments", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(newAppointment)
  //     });

  //     if (!res.ok) throw new Error('Failed to create appointment');
      
  //     const data = await res.json();

  //     // ✅ SUCCESS ALERT HERE
  //       alert("Appointment created successfully!");
        
  //       const mapped = {
  //     id: data.id,
  //     patientName: data.patient_name || '',
  //     patientId: data.patient_id || '',
  //     phone:data.phone || '',
  //     therapistName: data.therapist_name || '',
  //     date: data.appointment_date
  //       ? new Date(data.appointment_date).toLocaleDateString('en-IN')
  //       : '',
  //     time: data.appointment_time
  //       ? data.appointment_time.slice(0, 5)
  //       : '',
  //     duration: data.duration || 0,
  //     status: data.status || 'scheduled',
  //     type: data.type || 'therapy',
  //     notes: data.notes || ''
  //   };

  //     // update appointment list
  //   setAppointments((prev: any) => [...prev, data]);
    

  //   // admin log
  //   const logMessage = `Appointment created for ${formData.patientName} at ${new Date().toLocaleString()}`;
  //   setLogs((prev: string[]) => [...prev, logMessage]);
      
  //     // Reset form
  //     setFormData({
  //       patientName: '',
  //       patientId: '',
  //       phone: '',
  //       therapistName: '',
  //       date: '',
  //       time: '',
  //       duration: 60,
  //       status: 'scheduled',
  //       type: 'consultation',
  //       notes: ''
  //     });
  //   } catch (err) {
  //     console.error("Error creating appointment:", err);
  //     alert("Failed to create appointment. Please try again.");
  //   }
  // }




  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
    'no-show': 'bg-gray-100 text-gray-800'
  }

  const typeColors = {
    therapy: 'bg-indigo-50 text-indigo-700',
    consultation: 'bg-cyan-50 text-cyan-700',
    'follow-up': 'bg-emerald-50 text-emerald-700',
    assessment: 'bg-amber-50 text-amber-700'
  }

  const filteredAppointments = appointments.filter(apt => {
    // Add safe checks with fallbacks
    const patientName = apt.patientName || '';
    const therapistName = apt.therapistName || '';
    const patientId = apt.patientId || '';
    
    const matchesSearch = 
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus
    
    // Date filtering logic
    const today = new Date().toISOString().split('T')[0]
    const aptDate = apt.date || '';
    
    const matchesDate = selectedDate === 'all' || 
      (selectedDate === 'today' && aptDate === today) ||
      (selectedDate === 'upcoming' && aptDate > today) ||
      (selectedDate === 'past' && aptDate < today)

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusIcon = (status: AppointmentStatus) => {
    switch(status) {
      case 'scheduled': return <ClockIcon className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      case 'no-show': return <XCircle className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  const stats = [
    { label: 'Total Appointments', value: appointments.length, color: 'bg-blue-500' },
    { label: 'Scheduled', value: appointments.filter(a => a.status === 'scheduled').length, color: 'bg-blue-500' },
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, color: 'bg-green-500' },
    { label: 'Today', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length, color: 'bg-purple-500' },
  ]

  const therapists = [
  "Dr. Manikandan",
  "Dr. Sarah Wilson",
  "Dr. Shenka",
  "Dr. Renuka",
  "Dr. Subramanian",
  "Dr. Murugan"
];

  const generateTimeOptions = () => {
  const times = [];
  for (let hour = 1; hour <= 12; hour++) {
    for (let min of ["00", "30"]) {
      times.push(`${hour}:${min} AM`);
      times.push(`${hour}:${min} PM`);
    }
  }
  return times;
};

const handleExport = () => {
  const csvRows = [];

  // Header row
  csvRows.push(["Patient Name", "Date", "Time", "Type", "Status"]);

  // Data rows
  appointments.forEach((appt) => {
    csvRows.push([
      appt.patientName,
      appt.date,
      appt.time,
      appt.type,
      appt.status
    ]);
  });

  // Convert to CSV string
  const csvContent = csvRows
    .map(row => row.join(","))
    .join("\n");

  // Create file
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "appointments.csv";
  a.click();
};


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage and track all patient appointments</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button onClick ={handleExport}
          className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center shadow-lg hover:shadow-xl transition-all "
          >
            <Plus className="h-5 w-5 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        onClick={()=>setShowModal(false)}>
          <div className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">New Appointment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-3">
               <label className="block text-sm font-medium mb-1">
                  Patient Name
               </label>
              <input
                type="text"
                placeholder="Patient Name"
                className="w-full border p-2 rounded"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </div>
            <div>
               <label className="block text-sm font-medium mb-1">
                  Patient ID
                 </label>
              <input
                type="text"
                placeholder="Patient ID"
                className="w-full border p-2 rounded"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                  Phone
                 </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                 </label>
                <input
                  type="email"
                   placeholder="Email"
                  className="w-full border p-2 rounded"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Therapist
              </label>
            <select
              className="w-full border p-2 rounded"
              value={formData.therapistName}
              onChange={(e) =>
              setFormData({ ...formData, therapistName: e.target.value })
               }  >
            <option value="">Select Therapist</option>
            { therapists.map((name, index) => (
              <option key={index} value={name}>
              {name}
            </option>
               ))}
            </select>
            </div>
            <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Appointment Date
                  </label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              </div>

              <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Time
          </label>
<select
  className="w-full border p-2 rounded"
  value={formData.time}
  onChange={(e) =>
    setFormData({ ...formData, time: e.target.value })
  }
>
  <option value="">Select Time</option>
  {generateTimeOptions().map((time, index) => (
    <option key={index} value={time}>
      {time}
    </option>
  ))}
</select>
  </div>

<div className="mb-3">
  <label className="block text-sm font-medium mb-1">
    Duration (minutes)
  </label>
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full border p-2 rounded"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
              />
</div>

          <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                  Appointment Status
              </label>
              <select
                className="w-full border p-2 rounded"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as AppointmentStatus })}
              >
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
          </div>

      <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
               Appointment Type
            </label>
              <select
                className="w-full border p-2 rounded"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value  as AppointmentType })}
              >
                <option value="therapy">Therapy</option>
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="assessment">Assessment</option>
              </select>
        </div>

        <div className="mb-3">
             <label className="block text-sm font-medium mb-1">
                Notes
            </label>
              <textarea
                placeholder="Notes"
                className="w-full border p-2 rounded"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
              </div>
            

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
            </form>
          </div>
        </div>
      )}

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
                  <Calendar className="h-6 w-6 text-white" />
                </div>
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
                placeholder="Search by patient name, ID, or therapist..."
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
                onChange={(e) => setSelectedStatus(e.target.value as AppointmentStatus | 'all')}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            {/* Date Filter */}
            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="all">All Dates</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading appointments...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Therapist</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                             <div className="font-medium text-gray-900">{apt.patientName || 'N/A'}</div>
                             <div className="text-xs text-gray-500">ID: {apt.patientId || 'N/A'}</div>
                             <div className="text-xs text-gray-500">Phone: 📞 {apt.phone || 'N/A'}</div>
                             <div className="text-xs text-gray-500">Email: {apt.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                            <UserCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="ml-2 text-sm text-gray-900">{apt.therapistName || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                              {apt.date ? apt.date.split("T")[0] : 'N/A'}
                            </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {apt.time || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {apt.duration || 0} min
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[apt.type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800'}`}>
                          {apt.type || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColors[apt.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                            {getStatusIcon(apt.status)}
                            <span className="ml-1 capitalize">{apt.status || 'N/A'}</span>
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No appointments match your current filters. Try adjusting your search or filters.
                </p>
              </div>
            )}

            {/* Pagination/Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredAppointments.length}</span> of{' '}
                <span className="font-medium">{appointments.length}</span> appointments
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </Card>



      {showOtpModal && (
  <div className="fixed inset-0  z-[9999]  flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Enter OTP"
      />

      <button
        onClick={handleVerifyOtp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Verify OTP
      </button>
    </div>
  </div>
)}



      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointments by Status</h3>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              Object.entries(statusColors).map(([status, colorClass]) => {
                const count = appointments.filter(a => a.status === status).length
                const percentage = appointments.length > 0 ? (count / appointments.length) * 100 : 0
                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium text-gray-700">{status}</span>
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
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No appointment data available</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments
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
            {appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

