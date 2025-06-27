import React, { lazy, Suspense } from 'react'
const DevDashboard = lazy(()=> import("@/components/developer/DevDashboard"))

const DeveloperDashboard = () => {
  return (
    <Suspense fallback={<p className='text-white'>Loading developer dashboard....</p>}>
      <DevDashboard/>
    </Suspense>
  )
}

export default DeveloperDashboard