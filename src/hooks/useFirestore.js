import { projectFirestore, timestamp } from "../firebase/config";
import { useEffect, useState, useReducer } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
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
        console.log("ISCANCELED", isCanceled)
        if (!isCanceled)
            dispatch(action);
    }

    //add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING', document: null, success: false, error: null });
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await addDoc(ref, { ...doc, createdAt });
            console.log("ADDED DOCUMENT", addedDocument);
            dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCanceled({ type: "ERROR", payload: err.message })
            console.log("SDF", err)

        }
    }


    //delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING', document: null, success: false, error: null });
        try {
            const refdoc = doc(projectFirestore, coll, id);
            const deletedDocument = await deleteDoc(refdoc);
            console.log("DELETED DOCUMENT", deleteDocument);
            dispatchIfNotCanceled({ type: "DELETED_DOCUMENT", payload: deletedDocument })
        }
        catch (err) {
            dispatchIfNotCanceled({ type: "ERROR", payload: err.message })
            console.log("SDF", err)

        }
    }

    //update a document
    const updateDocument = async (id, updatedfields) => {


        dispatch({ type: 'IS_PENDING', document: null, success: false, error: null });
        try {
            const refdoc = doc(projectFirestore, coll, id);
            const updatedDocument = await updateDoc(refdoc, updatedfields);

            console.log("UPDATED DOCUMENT", updatedDocument);
            dispatchIfNotCanceled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
        }
        catch (err) {
            dispatchIfNotCanceled({ type: "ERROR", payload: err.message })
            console.log("SDF", err)

        }
    }

    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}