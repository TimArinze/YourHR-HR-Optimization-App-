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
import { useEffect, useState } from 'react'


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, [])
  return (
    <div>
      <Routes>
        {!isLoggedIn && <Route path="/*" element={<Login setLoggedIn={setLoggedIn} />} />}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}>
              <Route path="leave" element={<Leave />}>
                <Route index element={<LeaveSummary />} />
                <Route path="apply" element={<LeaveApplication />} />
                <Route path="holidays" element={<ListOfHolidays />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="/profile/personaldetails" element={<ProfilePersonal />} />
              <Route path="/profile/employmentdetails" element="" />
            </Route>
          </>
        ) : (
          // Login and Register routes
          <>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Registration />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;