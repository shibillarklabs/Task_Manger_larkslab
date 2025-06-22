
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import MainNav from './components/MainNav'
import AdminAllUser from './Pages/admin/AdminAllUser'
import AdminAllProjects from './Pages/admin/AdminAllProjects'
import { Toaster } from './components/ui/toaster'
import ProjectDashboard from './Pages/projectmanger/ProjectDashboard'
import ManagerAllProjects from './Pages/projectmanger/ManagerAllProjects'
import Team from './Pages/projectmanger/Team'
import DeveloperDashboard from './Pages/developer/DeveloperDashboard'
import TesterDashboard from './Pages/tester/TesterDashboard'
import Viewer from './Pages/viewer/Viewer'

function App() {
  const location = useLocation();
  const hideNavOn: string[]=['/'];

  return (<>
      {!hideNavOn.includes(location.pathname) && <MainNav/>}
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/admin/all-users" element={<AdminAllUser/>}/>
        <Route path="/admin/all-projects" element={<AdminAllProjects/>}/>
        <Route path='/manager/dashboard' element={<ProjectDashboard/>}/>
        <Route path='/manager/allprojects' element={<ManagerAllProjects/>}/>
        <Route path='/manager/team' element={<Team/>}/>
        <Route path='/developer/dashboard' element={<DeveloperDashboard/>}/>
        <Route path='/tester/dashboard' element={<TesterDashboard/>}/>
        <Route path='/user/dashboard' element={<Viewer/>}/> 
      </Routes>

      <Toaster/>
    </>
  )
}

export default App
