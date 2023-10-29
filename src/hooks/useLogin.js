import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useEffect, useState } from "react";

export const useLogin = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await signInWithEmailAndPassword(projectAuth, username, password);

            //dispath Logout Action
            dispatch({ type: 'LOGIN', payload: res.user })

            //updatestate
            if (!isCanceled) {
                setError(null);
                setIsPending(false);
            }
        }
        catch (err) {
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

    return { login, error, isPending }

}