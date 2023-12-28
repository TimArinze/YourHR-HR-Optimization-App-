import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {
  return (
    <div>
      <Home/>
      <Routes>
        <Route path='login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
