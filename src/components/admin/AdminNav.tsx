import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { FolderKanban, LayoutDashboard, Users } from 'lucide-react'

const AdminNav = () => {
  return (
    <div className="bg-gray-900 p-2 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 max-w-7xl mx-auto">
        <Link to='/admin' className='flex-1'>
          <div className='w-full h-full'>
            <Button className='w-full h-full group py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 border border-gray-700 hover:border-blue-400 transform hover:-translate-y-1 text-left'>
              <div className="flex items-center gap-2 sm:gap-3">
                <LayoutDashboard className='text-blue-400 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0' size={28} />
                <div className="min-w-0 flex-1">
                  <h2 className='text-sm sm:text-lg lg:text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110 truncate'>Dashboard</h2>
                  <p className='text-xs sm:text-sm lg:text-base text-gray-400 truncate'>View analytics and reports</p>
                </div>
              </div>
            </Button>
          </div>
        </Link>
        
        <Link to={'/admin/all-users'} className='flex-1'>
          <div className="w-full h-full">
            <Button className='w-full h-full group py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 border border-gray-700 hover:border-green-400 transform hover:-translate-y-1 text-left'>
              <div className="flex items-center gap-2 sm:gap-3">
                <Users className='text-green-400 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0' size={28} />
                <div className="min-w-0 flex-1">
                  <h2 className='text-sm sm:text-lg lg:text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110 truncate'>Users</h2>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-400 truncate">Manage team members</p>
                </div>
              </div>
            </Button>
          </div>
        </Link>
        
        <Link to={'/admin/all-projects'} className='flex-1'>
          <div className="w-full h-full">
            <Button className='w-full h-full group py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 border border-gray-700 hover:border-purple-400 transform hover:-translate-y-1 text-left'>
              <div className="flex items-center gap-2 sm:gap-3">
                <FolderKanban className='text-purple-400 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0' size={28} />
                <div className="min-w-0 flex-1">
                  <h2 className='text-sm sm:text-lg lg:text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110 truncate'>Projects</h2>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-400 truncate">Track all projects</p>
                </div>
              </div>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminNav