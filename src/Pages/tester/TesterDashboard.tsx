import Tdashboard from '@/components/tester/Tdashboard'
import React, { Suspense } from 'react'

const TesterDashboard = () => {
  return (
    <Suspense fallback={<p className='text-white'>Loading TesterDashboard..</p>}>
      <Tdashboard/>
    </Suspense>
  )
}

export default TesterDashboard