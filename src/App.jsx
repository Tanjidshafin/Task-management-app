import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router'
import TaskBoard from './pages/TaskBoard'
import LandingPage from './pages/LandingPage'
import Private from './pages/Private'

function App() {
  const locations = useLocation()
  return (
    <div className='flex'>
      {locations.pathname !== "/getstarted" ? (<Sidebar />) : ""}
      <div className={`flex-1 ${locations.pathname !== '/getstarted' ? "md:ml-[280px]" : ""}`}>
        <Routes>
          <Route path='/' element={<Private><TaskBoard /></Private>} />
          <Route path="/getstarted" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
