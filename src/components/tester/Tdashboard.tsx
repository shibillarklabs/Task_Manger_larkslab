import React from 'react'
import { Button } from '../ui/button'
import { MessageSquare } from 'lucide-react'

const Tdashboard = () => {
  return (
    <div className='min-h-screen p-6 relative z-10'>
        <h2 className='text-3xl font-semibold text-white mb-6 drop-shadow-lg'>Project in Testing</h2>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 mb-5 shadow-lg text-white ">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className='text-3xl font-medium'>title</h3>
                <span className="mt-2 sm:mt-0 inline-block px-3 py-1 text-xs bg-yellow-400 text-black font-semibold rounded-full">
                    status
                </span>
            </div>
            <p className="text-sm italic mt-2">description</p>
            <p className="text-xs text-gray-300 mt-1">Due date : 92802</p>
            <button className='mt-4 flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 rounded text-white'>
                <MessageSquare size={16}/>
                </button>
        </div>
    </div>
  )
}

export default Tdashboard