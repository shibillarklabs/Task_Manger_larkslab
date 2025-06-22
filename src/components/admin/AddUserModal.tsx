import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { postUsersAPI } from '@/services/allAPI';

interface AddUserModalProps {
    onClose : () => void;
    onUserAdded:()=>void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({onClose,onUserAdded}) => {
        const [name, setName]= useState('');
        const [email, setEmail]= useState('');
        const [role, setRole]= useState('');
        const { toast } = useToast();

        const addUserMutation = useMutation({
            mutationFn: (userData : {name: string; email: string; role: string})=>postUsersAPI(userData),
            onSuccess:()=>{
                toast({
                    title:'Success',
                    description : 'User added Successfully',
                    variant: 'default',
                });
                onUserAdded();
            },
            onError:()=>{
                toast({
                    title: 'Something went wrong 🥲',
                    description: 'Could not add user. Please try again',
                    variant:'destructive',
                });
            },
        });

        const handleSubmit = ()=>{
            if(!name || !email || !role){
                toast({
                    title: 'Missing Fields',
                    description: 'Please fill in all the details',
                    variant: 'destructive',
                });
                return;
            }
            addUserMutation.mutate({name, email, role});
        };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
        <div className="bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-700 space-y-4">
            <h2 className="text-xl font-semibold text-white">Add New User</h2>
            <Input value={name} onChange={(e)=> setName(e.target.value)} type='text' placeholder='Enter the Name' className='bg-gray-800 text-white placeholder-gray-400'/>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter the Email' className='bg-gray-800 text-white placeholder-gray-400'/>
            <Select onValueChange={(value)=> setRole(value)}>
                <SelectTrigger className='bg-gray-800 text-white'>
                    <SelectValue placeholder="Select Role"/>
                </SelectTrigger>
                <SelectContent className='bg-gray-800 text-white'>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='User'>User</SelectItem>
                    <SelectItem value='Project_Manager'>Project Manager</SelectItem>
                    <SelectItem value='Developer'>Developer</SelectItem>
                    <SelectItem value='Tester'>Tester</SelectItem>

                </SelectContent>
            </Select>
            <div className="flex justify-end gap-3 pt-2">
                <Button onClick={onClose} className='bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 ease-in-out hover:scale-110'>Cancel</Button>
                <Button onClick={handleSubmit}  className='bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 ease-in-out hover:scale-110'>Add User</Button>
            </div>
        </div>
    </div>
  )
}

export default AddUserModal