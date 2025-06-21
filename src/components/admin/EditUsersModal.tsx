import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query';
import { updateUserAPI } from '@/services/allAPI';
import { useToast } from '@/hooks/use-toast';



interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface EditUserModalProps {
    user : User;
    onClose: ()=> void;
    onUserUpdated: ()=> void;
}

const EditUsersModal: React.FC<EditUserModalProps> = ({user, onClose, onUserUpdated}) => {
    const [name, setName]= useState(user.name);
    const [email, setEmail]= useState(user.email);
    const [role, setRole]= useState(user.role);
    const { toast } = useToast();


        const updateUserMutation = useMutation({
            mutationFn:({id, data }: {id: string; data: Partial<User> })=>
                updateUserAPI(id, data),
            onSuccess:()=>{
                toast({
                    title: 'User updated ✅',
                    description : 'Changes saved Successfully',
                });
                onUserUpdated();

            },
            onError:()=>{
                toast({
                    title: 'Update Failed ❌',
                    description : 'Something went wrong while updating',
                    variant :'destructive',
                });
            },
        });

        const handleUpdate =()=>{
            if(!name || !email || !role){
                toast({
                    title : 'Missing Fields',
                    description : 'Please fill in all fields',
                    variant :'destructive',
                });
                return;

            }
            updateUserMutation.mutate({id: user.id, data: {name, email, role},
            });
        };


  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
        <div className="bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-700 space-y-4">
            <h2 className='text-xl font-semibold text-white '>Edit User</h2>
            <Input value={name} onChange={(e)=> setName(e.target.value)} type='text' placeholder='Enter the Name' className='bg-gray-800 text-white placeholder-gray-400 '/>
            <Input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='Enter the Email' className='bg-gray-800 text-white placeholder-gray-400 '/>
            <Select value={role} onValueChange={(value)=> setRole(value)}>
                <SelectTrigger className='bg-gray-800 text-white'>
                    <SelectValue placeholder="Select Role"/>
                </SelectTrigger>
                <SelectContent className='bg-gray-800 text-white'>
                    <SelectItem value='Admin'>Admin</SelectItem>
                    <SelectItem value='User'>User</SelectItem>
                    <SelectItem value='Project_Manager'>Project Manager</SelectItem>
                    <SelectItem value='Developer'>Developer</SelectItem>
                    <SelectItem value='Tester'>Tester</SelectItem>
                    <SelectItem value='Viewer'>Viewer</SelectItem>


                </SelectContent>
            </Select>
            <div className="flex justify-end gap-3 pt-2">
                <Button className='bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 ease-in-out hover:scale-110' onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpdate}  className='bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 ease-in-out hover:scale-110'>Save Changes</Button>
            </div>
        </div>
    </div>
  )
}

export default EditUsersModal