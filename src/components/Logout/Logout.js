import React ,{useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../Store/AuthAction'
import Cookies from 'js-cookie';
import Api from '../../api'


function Logout() {
    Api.get('logout')
    .then(function(response){
        console.log(response);
    })

    const dispatch = useDispatch();
    const handleLogout = useCallback(
    () => {
        dispatch(logout());
        Cookies.remove('isLoggedIn');
        Cookies.remove('loading');
    },
    [dispatch],
  )
  handleLogout()  
return (<div></div>)
}

export default Logout

