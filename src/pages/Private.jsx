import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router'

const Private = ({ children }) => {
    const { user, loading } = useContext(AppContext)
    const navigate = useNavigate()
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>
    }
    if (!user) {
        navigate("/getstarted")
    }

    return children
}

export default Private
