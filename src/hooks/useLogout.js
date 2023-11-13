import { projectAuth } from "../firebase/config";
import { signOut } from 'firebase/auth';
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";

export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            await signOut(projectAuth);

            //dispath Logout Action
            dispatch({ type: 'LOGOUT' })

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
        setIsCanceled(false);
        return () => setIsCanceled(true);
    }, [])

    return { logout, error, isPending }

}