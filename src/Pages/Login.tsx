import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { loginUserAPI } from '@/services/allAPI'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail]= useState('')
    const [role, setRole]= useState('');
        const navigate = useNavigate();

        const handleLogin = async ()=>{
            try{
                const user = await loginUserAPI(email, role);
                localStorage.setItem('currentUser', JSON.stringify(user))

                toast({
                    title: 'Login Successful',
                    description: `Welcome back, ${user.name}!`,
                    variant: 'default',

                });
                switch(user.role){
                    case 'admin':
                        navigate('/admin/all-users');
                        break;
                    case 'Project_Manager':
                        navigate('/manager/dashboard');
                        break;
                    case 'Developer':
                        navigate('/developer/dashboard');
                        break;
                    case 'Tester':
                        navigate('/tester/dashboard');
                        break;
                    default:
                        navigate('/user/dashboard');
                }
            }catch(error){
                toast({
                    title: "login failed",
                    description: 'Invalid email or role',
                    variant: 'destructive'
                })
            }
        }


    
  return (
    <div className='min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-lg border border-gray-700 shadow-lg backdrop-blur">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Welcome Back!</h1>
            <div className="space-y-4 sm:space-y-6">
                <Input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='Enter Your Email' className='text-white placeholder-gray-400'/>
                <Select onValueChange={(value)=>setRole(value)}>
                    <SelectTrigger className='text-white bg-gray-900 border border-gray-700'>
                        <SelectValue placeholder="Select Role"/>
                    </SelectTrigger>
                    <SelectContent className='z-50 bg-gray-900 text-white border border-gray-700 shadow-md'>
                        <SelectItem value='admin'>Admin</SelectItem>
                        <SelectItem value='Project_Manager'>Project Manager</SelectItem>
                        <SelectItem value='Developer'>Developer</SelectItem>
                        <SelectItem value='Tester'>Tester</SelectItem>
                        <SelectItem value='User'>User</SelectItem>


                    </SelectContent>
                </Select>
                <Button onClick={handleLogin} className='w-full bg-purple-600 hover:bg-purple-700 text-white'>
                    Log In
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Login