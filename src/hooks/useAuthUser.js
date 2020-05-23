import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser, selectUsername } from '../features/auth/authSlice';
import { auth, db } from '../services/firebase';

export default () => {

    const dispatch = useDispatch();
    const currentUser = useSelector( selectCurrentUser );
    const username = useSelector(selectUsername);

    useEffect( () => {
        const setUser = async(user) => {
          let exist = false;
          console.log(user);
            if(user)  
            {
               let level = -1;
               let stats = [];
               let name = '';
                console.log(`displayName: ${user.displayName} username: ${username}`);
                await db.collection("users").doc(user.uid).get().then( function(doc) {
                if(doc.exist) name = doc.data().name;
                else name = user.displayName === null ? username : user.displayName;
                level = doc.exists ? doc.data().level : Number(-1);
                stats = doc.exists ? doc.data().stats : [];
                dispatch(login({ uid: user.uid, email: user.email, name: name , level : level, stats: stats, img: user.photoURL }));
                });
              if(exist === false) await db.collection("users").doc(user.uid).set({ email: user.email, name: name, level : level, stats:[], img: user.photoURL }, {merge: true});
          }
            else dispatch( logout() );
     }
    const unsubscribe = auth().onAuthStateChanged(setUser);

  return () => {
    unsubscribe();
  }
}, [dispatch,username]);

return currentUser;
}