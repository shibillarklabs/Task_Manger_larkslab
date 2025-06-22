import ManagerTeam from '@/components/projectmanager/ManagerTeam'
import ProjectNav from '@/components/projectmanager/ProjectNav'
import React, { Suspense } from 'react'

const Team = () => {
  return (
    <div className='bg-gray-900 min-h-screen text-white px-3 sm:px-6 py-4 sm:py-8'>
      <ProjectNav/>
      <Suspense fallback={<p className='text-white'>Loading Team.....</p>}>
      <ManagerTeam/>
      </Suspense>
    </div>
  )
}

export default Team