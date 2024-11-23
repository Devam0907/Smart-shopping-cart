import React from 'react'
import { Navigate } from 'react-router-dom'

function Proutes(props) {
    const isAuth = () => {
        return false
    }

    return isAuth() ? props.children : <Navigate to='/Home1' />

}

export default Proutes