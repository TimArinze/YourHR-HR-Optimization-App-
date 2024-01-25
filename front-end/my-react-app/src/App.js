import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Leave from './Components/Leave'
import Profile from './Components/Profile'
import LeaveSummary from './Components/LeaveSummary'
import ListOfHolidays from './Components/ListOfHolidays'
import LeaveApplication from './Components/LeaveApplication'
import ProfilePersonal from './Components/ProfilePersonal'
import Registration from './Components/Registration'
import Dashboard from './Components/Dashboard'
import { AuthProvider } from './Utils/auth'
import { RequiredAuth } from './Utils/RequiredAuth'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RequiredAuth><Home /></RequiredAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="leave" element={<Leave />}>
            <Route index element={<LeaveSummary />} />
            <Route path="apply" element={<LeaveApplication />} />
            <Route path="holidays" element={<ListOfHolidays />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="/profile/personaldetails" element={<ProfilePersonal />} />
          <Route path="/profile/employmentdetails" element="" />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;