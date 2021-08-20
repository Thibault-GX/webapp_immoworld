import React ,{useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../Store/AuthAction'


function Logout() {
    const dispatch = useDispatch();
    const handleLogout = useCallback(
        () => {
            dispatch(logout())
        },
        [dispatch],
      )
      handleLogout()  
    return (<div></div>)
}

export default Logout
