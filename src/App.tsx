
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import MainNav from './components/MainNav'
import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminAllUser from './Pages/admin/AdminAllUser'
import AdminAllProjects from './Pages/admin/AdminAllProjects'

function App() {
  const location = useLocation();
  const hideNavOn: string[]=['/'];

  return (<>
      {!hideNavOn.includes(location.pathname) && <MainNav/>}
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/all-users" element={<AdminAllUser/>}/>
        <Route path="/admin/all-projects" element={<AdminAllProjects/>}/>
      </Routes>
    </>
  )
}

export default App
