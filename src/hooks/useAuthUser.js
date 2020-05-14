import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser } from '../features/auth/authSlice';
import { auth, db } from '../services/firebase';

export default () => {

    const dispatch = useDispatch();
    const currentUser = useSelector( selectCurrentUser );
    React.useEffect( () => {
        const setUser = async(user) => {
          let exist = false;
          console.log(user);
            if(user)  
            {
               let level = -1;
               let stats = [];
              await db.collection("users").doc(user.uid).get().then( function(doc) {
                console.log('docdata',doc.data())
                level = doc.exists ? doc.data().level : Number(-1);
                stats = doc.exists ? doc.data().stats : [];
               dispatch(login({ uid: user.uid, email: user.email, name: user.displayName, level : level, stats: stats }));
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