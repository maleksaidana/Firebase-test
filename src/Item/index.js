import './style.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import { doc, onSnapshot, updateDoc,collection,arrayUnion } from 'firebase/firestore'
import { useDocument } from '../hooks/useDocument';
import { useFirestore } from '../hooks/useFirestore';


function Item() {


    const { id } = useParams();
    const { document, error } = useDocument("recipes", id);
    const { setDocument, response } = useFirestore("recipes");

    const handleUpdate =async () => {
        setDocument(id, { title: 'new title ' + (Math.floor(Math.random() * 90000) + 10000), ingredients:  arrayUnion("greater_virnia") }, true);
    }


    return (
        <div className="item">
            <h3>{document?.title}</h3>
            <p>{document?.cookingTime}</p>
            <p>{document?.method}</p>
            <p>{document?.createdAt?.toDate().toDateString()}</p>
            <p>Ingredients: </p>
            <ul className="ingredients">
                {
                    document?.ingredients.length > 0 && document.ingredients.map((item, i) => {
                        return <li key={i}> {item} </li>
                    })
                }
            </ul>
            <button onClick={handleUpdate}> update </button>

            <select name="languages" id="language-select" onFocus={(e)=>{e.target.size =12}}
                onChange={(e)=> {e.target.blur() ;e.target.size=1}}>
                <option value="">--Choose an option--</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="php">PHP</option>
                <option value="php">PHP</option>
            </select>
        </div>

    );
}

export default Item;
