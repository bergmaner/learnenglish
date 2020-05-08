import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login,logout,selectCurrentUser} from '../features/auth/authSlice';
import {auth,db} from '../services/firebase';


export default () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [ exists, setExists ] = useState(undefined);
    React.useEffect(() => {
        const setUser = async(user) => {
            if(user)  
            {
              dispatch(login({ uid: user.uid, email: user.email, name: user.displayName, level : Number(-1) })) 
               await db.collection("users").doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                   setExists(true);
                } else {
                    // doc.data() will be undefined in this case
                   setExists(false);
                   
                }
            })
          }
            else dispatch(logout())
     }
    const unsubscribe = auth().onAuthStateChanged(setUser);

  return () => {
    unsubscribe();
  }
}, [dispatch]);
React.useEffect(()=>{
  const addUserToDb = async(user) =>
  {
    if(user)//when user is logged
    {
      if(exists === false)//if user doesnt exist in firebase
    {
     db.collection('users').doc(user.uid).set({
      level : Number(-1),
      email : user.email,
      name : user.displayName
    });
    }
    }
    
  }
  const unsubscribe = auth().onAuthStateChanged(addUserToDb);
  return () => {
    unsubscribe();
  }
},[exists])
return currentUser;
}