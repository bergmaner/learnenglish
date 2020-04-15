import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login,logout,selectCurrentUser} from '../features/auth/authSlice';
import {auth} from '../services/firebase';

export default () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    React.useEffect(() => {
        const setUser = user => {
            user ? dispatch(login({ uid: user.uid, email: user.email })) : dispatch(logout())
     }
    const unsubscribe = auth().onAuthStateChanged(setUser);

  return () => {
    unsubscribe();
  }
}, [dispatch]);
return currentUser;
}