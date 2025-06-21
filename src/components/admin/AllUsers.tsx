import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Pencil, Trash2 } from 'lucide-react'
import { deleteUserAPI, getAllUsersAPI } from '@/services/allAPI'
import { useMutation, useQuery } from '@tanstack/react-query'
import AddUserModal from './AddUserModal'
import EditUsersModal from './EditUsersModal'
import { useToast } from '@/hooks/use-toast'

interface User {
  id:string;
  name:string;
  email:string;
  role:string;
}

const AllUsers = () => {
  const [isModelOpen, setIsModalOpen]=useState(false);
  const [EditUser, setEditUser]=useState<User | null>(null);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('All Roles');
  const { toast }= useToast();



       const {data: users =[],
        isLoading,
        isError,
        refetch,
       }= useQuery({
        queryKey : ["users"],
        queryFn: async()=>{
          const result: any = await getAllUsersAPI();
          return result.data;
        },
       });

       const deleteUserMutation = useMutation({
        mutationFn: (userId: string)=> deleteUserAPI(userId),
        onSuccess:()=>{
          toast({
            title: 'User Deleted 🗑️',
            description: 'The user has been removed successfully',

          });
          refetch();

        },
        onError:()=>{
          toast({
            title: 'Delete Failed ❌',
            description: 'Something went wrong while deleting the user',
            variant: 'destructive',
          });
        },
       });

       const filteredUsers = users.filter((user: User)=>{
        const nameMatch = user.name.toLowerCase().includes(searchName.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(searchEmail.toLowerCase());
        const roleMatch = searchRole === 'All Roles' || user.role === searchRole;
        return nameMatch && emailMatch && roleMatch;
       })

       if (isLoading) return <p className='text-white'>Loading users...</p>;
       if (isError) return <p className='text-red-400'>Error fetching users</p>;




  return (
    <div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 className='text-xl sm:text-2xl font-bold '>User Management</h1>
      <Button onClick={()=>setIsModalOpen(true)} className='bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-md px-4 py-2 text-sm sm:text-base w-full sm:w-auto'>+ Add User</Button>
    </div>
    <div className="mb-6 bg-gray-800 p-3 sm:p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <Input value={searchName} onChange={(e)=>setSearchName(e.target.value)} type='text' placeholder='Filter by Name' className='px-3 sm:px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'  />
      <Input value={searchEmail} onChange={(e)=>setSearchEmail(e.target.value)} type='email' placeholder='Filter by Email' className='px-3 sm:px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base' />
      <Select value={searchRole} onValueChange={(value)=>setSearchRole(value)}>
      <SelectTrigger className="px-3 sm:px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus::ring-2 focus:ring-blue-500 text-sm sm:text-base sm:col-span-2 lg:col-span-1">
        <SelectValue placeholder="Filter by Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="All Roles">All Roles</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="User">User</SelectItem>
          <SelectItem value="Project_Manager">Project_Manager</SelectItem>
          <SelectItem value="Developer">Developer</SelectItem>
          <SelectItem value="Tester">Tester</SelectItem>
          </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    <div className="hidden lg:block">
      <div className="grid grid-cols-5 gap-4 bg-gray-800 px-4 py-3 rounded-t-md border-b border-gray-700 font-semibold text-gray-300 text-sm uppercase tracking-wide">
        <div>#</div>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div className='text-right'>Actions</div>

      </div>
        
      
     {filteredUsers.map((user: User, index: number)=>(
       <div key={user.id} className="grid grid-cols-5 gap-4 bg-gray-800 px-4 py-4 border-b border-gray-700 hover:bg-gray-700 transition">
        <div>{index + 1}</div>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div className="text-blue-400">{user.role}</div>
        <div className="flex justify-end gap-4">
          <button onClick={()=> setEditUser(user)} className='text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110'><Pencil size={20}/></button>
        <button onClick={()=>deleteUserMutation.mutate(user.id)} className='text-red-400 hover:text-red-300 transition-transform hover:scale-110' ><Trash2 size={20}/></button>
        </div>
      </div>
     ))}
  </div>
  {/* mobile view */}
  <div className="lg:hidden space-y-4">
   {filteredUsers.map((user:User, index:number)=>(
     <div  key={user.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className='bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm font-medium'>#{index + 1}</span>
          <h3 className='font-semibold text-lg'>{user.name}</h3>
        </div>
        <div className="flex gap-3">
          <button onClick={()=> setEditUser(user)} className='text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110 p-1' ><Pencil size={18}/></button>
          <button onClick={()=>deleteUserMutation.mutate(user.id)} className='text-red-400 hover:text-red-300 transition-transform hover:scale-110 p-1'><Trash2 size={18}/></button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className='text-gray-400 text-sm font-medium min-w-0 sm:min-w-16'>Email :</span>
          <span className='text-white truncate'>{user.email}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="text-gray-400 text-sm font-medium min-w-0 sm:min-w-16">Role :</span>
          <span className="text-blue-400 font-medium">{user.role}</span>
        </div>
      </div>
    </div>
   ))}
  </div>
  {
    isModelOpen && (
      <AddUserModal onClose={()=> setIsModalOpen(false)} onUserAdded={()=>{refetch(); setIsModalOpen(false)}} />
    )
  }
  {
    EditUser && (
      <EditUsersModal user={EditUser} onClose={()=> setEditUser(null)} onUserUpdated={()=>{refetch(); setEditUser(null);}}/>
    )
  }

    </div>
    
  )
}

export default AllUsers