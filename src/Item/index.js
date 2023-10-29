import './style.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import { doc, onSnapshot  } from 'firebase/firestore'


function Item() {

    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        const ref = doc(projectFirestore, 'recipes', id)

        const unsub = onSnapshot(ref, (doc) => {
            if (doc.exists) {
                console.log("Single Item", doc.data());
                setData({ id: doc.id, ...doc.data() });

            }

        }, (err) => {
            console.log("ERROR ON Real time fetch", err)
        })

        return() => unsub()


    }, [id])

    const handleUpdate = () => {
        projectFirestore.collection('recipes').doc(id).update({
            title: 'new title ' + (Math.floor(Math.random() * 90000) + 10000)

        })
    }


    return (
        <div className="item">
            <h3>{data?.title}</h3>
            <p>{data?.cookingTime}</p>
            <p>{data?.method}</p>
            <p>{data?.createdAt.toDate().toDateString()}</p>
            <p>Ingredients: </p>
            <ul className="ingredients">
                {
                    data?.ingredients.length > 0 && data.ingredients.map((item, i) => {
                        return <li key={i}> {item} </li>
                    })
                }
            </ul>
            <button onClick={handleUpdate}> update </button>

        </div>

    );
}

export default Item;
