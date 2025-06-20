import React from 'react'
import { Button } from "@/components/ui/button"

const MainNav = () => {
  return (
   
    <nav className="bg-gradient-to-r from-slate-900/90 to-black/90 backdrop-blur-sm shadow-lg border-b border-blue-500/20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
                <div className="flex-shrink-0">
                    <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold font-raleway text-[#afbcc9]'>
                        TeamStak
                    </h1>
                </div>
                <div className="flex items-center">
                    <Button variant="destructive">Logout</Button>
                </div>
            </div>
        </div>
    </nav>
    
    
  )
}

export default MainNav