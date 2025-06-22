import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { FolderClock, LayoutDashboard, Users2Icon } from 'lucide-react'

const ProjectNav = () => {
  return (
    <div className='bg-gray-900 p-2 sm:p-4 lg:p-6'>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 max-w-7xl mx-auto">
            <Link to={'/manager/dashboard'} className='flex-1'>
                <div className="w-full h-full">
                    <Button className='w-full h-full group py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 border border-gray-700 hover:border-green-400 transform hover:-translate-y-1 text-left'>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <LayoutDashboard className='text-green-400 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0' size={28}/>
                            <div className="min-w-0 flex-1">
                                <h2 className='text-sm sm:text-lg lg:text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110 truncate' >Dashboard</h2>
                                <p className='text-xs sm:text-sm lg:text-base text-gray-400 truncate'>Everything you need in one place.</p>
                            </div>
                        </div>

                    </Button>
                </div>

            </Link>
            <Link to={'/manager/allprojects' } className='flex-1'>
            <div className="w-full h-full">
                <Button className='w-full h-full group py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 border border-gray-700 hover:border-purple-400 transform hover:-translate-y-1 text-left'>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <FolderClock className='text-purple-400 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0' size={28}/>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm sm:text-lg lg:text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110 truncate ">Projects</h2>
                            <p className='text-xs sm:text-sm lg:text-base text-gray-400 truncate'>Track all projects in one place &nbsp; &nbsp;</p>
                        </div>
                    </div>
                </Button>
            </div>
            </Link>
            <Link to={'/manager/team'} className='flex-1'>
            <div className="w-full h-full">
                <Button className='w-full h-full group py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 border border-gray-700 hover:border-blue-400 transform hover:-translate-y-1 text-left'>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Users2Icon className='text-blue-400 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0 ' size={28}/>
                        <div className="min-w-0 flex-1">
                            <h2 className='text-sm sm:text-lg lg:text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110 truncate'>Team</h2>
                            <p className='text-xs sm:text-sm lg:text-base text-gray-400 truncate'>Team management made simple</p>
                        </div>
                    </div>
                </Button>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default ProjectNav