import { useEffect, useState } from 'react';
import { projectFirestore, projectStorage } from '../firebase/config';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, deleteDoc } from 'firebase/firestore';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';

import { useCollection } from '../hooks/useCollection';

function Game() {

    //Form
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const { addDocument, response } = useFirestore("games");
    const { user } = useAuthContext();

    const { documents, error } = useCollection("games", ["uid", "==", user.uid], ["createdAt", "desc"]);


    const deleteItem = async (id) => {
        try {
            const ref = doc(projectFirestore, 'games', id)
            await deleteDoc(ref);

        }
        catch (e) {
            console.log("ERROR", e);
        }
    }



    const handleSubmit = async (e) => {

        //upload user image
        const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;
        const imageRef  = await ref(projectStorage, uploadPath);

        uploadBytes(imageRef, thumbnail)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((imgUrl) => {
                        const doc = { name, age, imgUrl };
                        addDocument({ ...doc, uid: user.uid })
                    })
                    .catch((error) => {
                    });
            })
            .catch((error) => {
            });

        e.preventDefault();

    }

    useEffect(() => {
        if (response.success) {
            setName("");
            setAge("");
        }
    }, [response])

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];
        if (!selected) {
            console.log("NOT SELECTED");
            return
        }
        if (!selected.type.includes('image')) {
            console.log("seleceted file must be image");
            return

        }
        if (selected.size > 1000000) {
            console.log("file too big ");
            return

        }
        setThumbnail(selected);

    }

    return (
        <div className="container">
            {error && <p>{error}</p>}
            {documents && documents.map((item, i) => {
                return (
                    <div className="card" key={i}>
                        <h2>{item.name}</h2>
                        <p>{item.age}</p>
                        <img alt="not Found" width={100} height={100} src={item.imgUrl} />
                        <button onClick={() => deleteItem(item.id)}> Delete </button>
                    </div>
                );
            })}

            <div className="form">
                <input value={name} onChange={e => setName(e.target.value)} placeholder='NAME' />
                <input value={age} onChange={e => setAge(e.target.value)} placeholder='AGE' />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit}> Submit </button>
            </div>
        </div>
    );
}

export default Game;
