import { useEffect, useState } from "react";
import { Search, UserPlus, MoreVertical, Mail, Clock } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastactive: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");


  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {

      fetch(`${API_URL}/api/users`)
    //fetch("https://nila-backend-yzem.onrender.com/api/users")
    //fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, [API_URL]);

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );


  const [showDialog, setShowDialog] = useState(false);

const [form, setForm] = useState({
  name: "",
  email: "",
  role: "",
  status: "Active"
});


const addUser = async (e:  React.FormEvent) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  const newUser = await res.json();

  setUsers([newUser, ...users]);

  setShowDialog(false);

  setForm({
    name: "",
    email: "",
    role: "",
    status: "Active"
  });
};


  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage your team members</p>
        </div>
        <button onClick={() => setShowDialog(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
          <UserPlus className="h-5 w-5" />
          Add User
        </button>
      </div>






    


{showDialog && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-96">

      <h2 className="text-xl font-semibold mb-4">Add User</h2>

      <form onSubmit={addUser} className="space-y-3">

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e)=>setForm({...form,role:e.target.value})}
          className="w-full border p-2 rounded"
        />

        <select
          value={form.status}
          onChange={(e)=>setForm({...form,status:e.target.value})}
          className="w-full border p-2 rounded"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex justify-end gap-2 pt-2">

          <button
            type="button"
            onClick={()=>setShowDialog(false)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>

        </div>

      </form>

    </div>
  </div>
)}




      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                  {user.name?.charAt(0)}
                </div>
                
                {/* Info */}
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {user.lastactive}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Role */}
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {user.role}
                </span>
                
                {/* Status */}
                <span className={`px-3 py-1 rounded-full text-sm ${
                  user.status === "Active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {user.status}
                </span>

                {/* Actions */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
