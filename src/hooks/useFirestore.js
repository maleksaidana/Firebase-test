import { projectFirestore, timestamp } from "../firebase/config";
import { useEffect, useState, useReducer } from "react";
import { collection, addDoc } from 'firebase/firestore';


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {  isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (coll) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCanceled, setIsCanceled] = useState(false);

    //collection ref

    const ref = collection(projectFirestore, coll);

    //only dipatch if not canceled
    const dispatchIfNotCanceled = (action) => {
        console.log("ISCANCELED",isCanceled)
        if (!isCanceled)
            dispatch(action);
    }

    //add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING', document: null, success: false, error: null });
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await addDoc(ref, {...doc, createdAt});
            console.log("ADDED DOCUMENT", addedDocument);
            dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCanceled({ type: "ERROR", payload: err.message })
            console.log("SDF",err)

        }
    }


    //delete a document
    /*const deleteDocument = (id) => {

    }*/

    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { addDocument, response }
}