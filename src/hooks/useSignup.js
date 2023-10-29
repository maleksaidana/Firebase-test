import { useEffect, useState } from "react";
import {projectAuth} from '../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {

    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (username, password, displayName) =>{
        setError(null);
        setIsPending(true);
        try{

            const res = await createUserWithEmailAndPassword(projectAuth, username, password);
            console.log(res.user);
            if(!res){
                throw new error("Could not complete signup");
            }

            await res.user.updateProfile({ displayName });

            //Dispath login Function
            dispatch({type: 'LOGIN', payload: res.user})

            //updatestate
                setError(null);
                setIsPending(false);
            

        }
        catch(err){
            if (!isCanceled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }

        }
    }

    useEffect(() => {
        return () => setIsCanceled(true);
    }, [])


    return{ signup, isPending, error }
}
