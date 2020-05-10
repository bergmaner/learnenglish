import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser } from '../features/auth/authSlice';
import { auth, db } from '../services/firebase';


export default () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    React.useEffect(() => {
        const setUser = async(user) => {
          let exist = false;
            if(user)  
            {
               let level = -1;
              await db.collection("users").doc(user.uid).get().then(function(doc) {
                console.log('docdata',doc.data())
                level = doc.exists ? doc.data().level : Number(-1);
               if(doc.exists) 
               {
                 exist = true;
                 dispatch(login({ uid: user.uid, email: user.email, name: user.displayName, level : level, stats: doc.data().stats }));
               }
                });
              if(exist === false) await db.collection("users").doc(user.uid).set({ email: user.email, name: user.displayName, level : level, stats:[] }, {merge: true});
          }
            else dispatch( logout() );
     }
    const unsubscribe = auth().onAuthStateChanged(setUser);

  return () => {
    unsubscribe();
  }
}, [dispatch]);

return currentUser;
}