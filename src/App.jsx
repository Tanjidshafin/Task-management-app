import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router'
import TaskBoard from './pages/TaskBoard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar />
      <div className='max-w-screen-xl mx-auto'>
        <Routes>
          <Route path='/' element={<TaskBoard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
