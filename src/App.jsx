import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router'
import TaskBoard from './pages/TaskBoard'
import LandingPage from './pages/LandingPage'
import Private from './pages/Private'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

function App() {
  const locations = useLocation()
  const { user } = useContext(AppContext)
  return (
    <div className='flex'>
      {locations.pathname !== "/getstarted" ? (<Sidebar />) : ""}
      <div className={`flex-1 ${locations.pathname !== '/getstarted' ? "md:ml-[280px]" : ""}`}>
        <Routes>
          <Route path='/' element={<Private><TaskBoard /></Private>} />
          {!user && <Route path="/getstarted" element={<LandingPage />} />}
          <Route path="/profile" element={<Private><Profile /></Private>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
