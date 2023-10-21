import './style.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

function Item() {

    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        getItem();

    }, [])

    const getItem = () => {
        projectFirestore.collection('recipes').doc(id).get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Single Item", doc.data());
                    setData({ id: doc.id, ...doc.data() });

                }
            })
            .catch(err => {
                console.log("single item", err);
            });
    }


    return (
        <div class="item">
            <h3>{data?.title}</h3>
            <p>{data?.cookingTime}</p>
            <p>{data?.method}</p>
            <p>Ingredients: </p>
            <ul class="ingredients">
                {
                    data?.ingredients.length > 0 && data.ingredients.map((item, i) => {
                        return <li key={i}> {item} </li>
                    })
                }
            </ul>
        </div>

    );
}

export default Item;
