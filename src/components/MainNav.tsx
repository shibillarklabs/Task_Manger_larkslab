import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const MainNav = () => {
    const [user ,setUser]= useState<{name: string; role: string }| null>(null);
        const navigate = useNavigate();
    useEffect(()=>{
        const stored = localStorage.getItem("currentUser");
        if(stored){
            try{
                const parsed = JSON.parse(stored);
                setUser({name: parsed.name, role: parsed.role});
            }catch(err){
                console.error('Invalid user object in localStorage');
                setUser(null);
            }
        }
    },[]);

    const handleLogout= ()=>{
        localStorage.removeItem('user');
        setUser(null);
        toast({
            title: 'Logout Successfull',
            description: 'You have been logged out',
            variant: 'default',
        })
        navigate('/')
    };
  return (
   
    <nav className="bg-gradient-to-r from-slate-900/90 to-black/90 backdrop-blur-sm shadow-lg border-b border-blue-500/20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
                <div className="flex-shrink-0">
                    <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold font-raleway text-[#afbcc9]'>
                        TeamStak
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="text-xs sm:text-sm text-purple-300 text-right">
                            <div>Hai, <span className="font-medium">{user.name}</span></div>
                            <div className="capitalize">{user.role}</div>
                        </div>
                    )}
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    </nav>
    
    
  )
}

export default MainNav