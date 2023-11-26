
import { projectFirestore } from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";

export const useDocument = (coll, id, subCollectionName = null, subDocumentId = null) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        let ref = null;
        if (subCollectionName && subDocumentId) {
            ref = doc(projectFirestore, coll, id, subCollectionName, subDocumentId);
        }
        else {
            ref = doc(projectFirestore, coll, id);
        }

        const unsubscribe = onSnapshot(ref, (doc) => {
            if (doc.exists) {
                console.log("Single Item", doc.data());
                setDocument({ id: doc.id, ...doc.data() });

            }
            setError(null);

        }, (err) => {
            setError(err);
        })

        return () => unsubscribe()

    }, [id])

    return { document, error }

}