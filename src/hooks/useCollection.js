
import { projectFirestore } from "../firebase/config";
import {collection, query, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";

export const useCollection = (coll, _query, _orderBy, _limit) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    
    const q = useRef(_query).current;
    const order = useRef(_orderBy).current;
    const limit = useRef(_limit).current;

    useEffect(() => {

        let ref = collection(projectFirestore, coll);

        if(q){
            ref = query(ref, q)
        }

        if(order){
            ref = query(ref, order)

        }

        if(limit){
            ref = query(ref, limit)

        }

        const unsubscribe = onSnapshot(ref, (snapshot)=>{
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id});
            })
            setDocuments(results);
            setError(null);
        }, (error) =>{
            setError("could not fetch");
            console.log("ASBA",error)
        })

        return () => unsubscribe();
    }, [coll, q, order, limit])

    return { documents, error }

}