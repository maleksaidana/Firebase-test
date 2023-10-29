
import { projectFirestore } from "../firebase/config";
import {collection, getDocs, query, onSnapshot, where, orderBy } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";

export const useCollection = (coll, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    
    const q = useRef(_query).current;
    const order = useRef(_orderBy).current;

    useEffect(() => {

        let ref = collection(projectFirestore, coll);

        if(q){
            ref = query(ref, where(...q))
        }

        if(order){
            ref = query(ref, orderBy(...order))

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
            console.log(error)
        })

        return () => unsubscribe();
    }, [coll, query, order])

    return { documents, error }

}