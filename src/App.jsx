import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router'
import TaskBoard from './pages/TaskBoard'
import LandingPage from './pages/LandingPage'


function App() {
  const [count, setCount] = useState(0)
  const locations = useLocation()
  return (
    <div className='flex'>
      {locations.pathname !== "/getstarted" ? (<Sidebar />) : ""}
      <div className={`flex-1 ${locations.pathname !== '/getstarted' ? "md:ml-[280px]" : ""}`}>
        <Routes>
          <Route path='/' element={<TaskBoard />} />
          <Route path="/getstarted" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
