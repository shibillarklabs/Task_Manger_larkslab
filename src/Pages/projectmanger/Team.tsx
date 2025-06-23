import ProjectNav from '@/components/projectmanager/ProjectNav'
import React, { lazy, Suspense } from 'react'

const ManagerTeam = lazy(()=> import("@/components/projectmanager/ManagerTeam"))

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