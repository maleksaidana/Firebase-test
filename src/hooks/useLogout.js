import { projectAuth } from "../firebase/config";
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
            await projectAuth.signOut();

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
        return () => setIsCanceled(true);
    }, [])

    return { logout, error, isPending }

}