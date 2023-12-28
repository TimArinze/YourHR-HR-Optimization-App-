import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
