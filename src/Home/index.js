import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import './style.css';

function Home() {

    const [data, setData] = useState(null);

    //Form
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);


    useEffect(() => {

        getItemsRealTime();

        return() => getItemsRealTime()

    }, [])

    const getItems = () => {
        projectFirestore.collection('recipes').get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    setData("EMPTY");
                }
                else {
                    let results = [];
                    snapshot.docs.forEach(doc => {
                        results.push({ id: doc.id, ...doc.data() })
                    })
                    setData(results);
                    console.log("All Results", results)

                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getItemsRealTime = () => {
        return projectFirestore.collection('recipes').onSnapshot((snapshot) => {
                if (snapshot.empty) {
                    setData("EMPTY");
                }
                else {
                    let results = [];
                    snapshot.docs.forEach(doc => {
                        results.push({ id: doc.id, ...doc.data() })
                    })
                    setData(results);
                    console.log("All Results", results)

                }
            }, (err) =>{
                console.log("ERROR ON Real time fetch", err)
            })

    }

    const getItem = () => {
        projectFirestore.collection('recipes').doc("0Mm6ArfhtoQgYPQ1BQnv").get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Single Item", doc.data());

                }
            })
            .catch(err => {
                console.log("single item", err);
            });
    }

    const deleteItem = async (id) => {
        try {
            await projectFirestore.collection('recipes').doc(id).delete();

        }
        catch (e) {
            console.log("ERROR", e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const doc = { title, ingredients, method, cookingTime };
        setTitle("");
        setMethod("");
        setCookingTime("");
        setIngredient("");
        setIngredients([]);

        try {
            await projectFirestore.collection('recipes').add(doc);
        }
        catch (e) {
            console.log("ERROR", e);
        }
    }

    return (
        <div className="container">
            {data && data.map((item, i) => {
                return (
                    <div className="card" key={i}>
                        <h2>{item.title}</h2>
                        <p>{item.method}</p>
                        <p>{item.cookingTime}</p>
                        <button onClick={getItem}> Details </button>
                        <button onClick={() => deleteItem(item.id)}> Delete </button>
                    </div>
                );
            })}

            <div className="form">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
                <input value={cookingTime} onChange={e => setCookingTime(e.target.value)} placeholder='Cooking Time' />
                <input value={method} onChange={e => setMethod(e.target.value)} placeholder='Method' />
                <input value={ingredient} onChange={e => setIngredient(e.target.value)} placeholder='Ingredient' />
                <button onClick={e => setIngredients(prevState => [...prevState, ingredient])}> Add Ingredient </button>
                {
                    ingredients.length > 0 && ingredients.map((item, i) => {
                        return <p key={i}> {item} </p>
                    })
                }

                <button onClick={handleSubmit}> Submit </button>
            </div>
        </div>
    );
}

export default Home;
