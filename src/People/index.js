import React from 'react';
import { useCollection } from '../hooks/useCollection';
import { useEffect, useState } from 'react';
import { projectStorage } from '../firebase/config';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';
import Person from '../Person';
import getImageFile from '../utils/getImageFile';



const People = () => {


    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const { addDocument, response } = useFirestore("games");
    const { user } = useAuthContext();
    const { documents, error } = useCollection("games", ["uid", "==", user.uid], ["createdAt", "desc"]);



    const handleSubmit = async (e) => {

        //upload user image
        const uploadPath = `thumbnails/${user.uid}/${thumbnail?.name}`;
        const imageRef = await ref(projectStorage, uploadPath);

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


    const uploadImage = async (imageRef, image) => {
        try {

            const snapshot = await uploadBytes(imageRef, image);
            const imgUrl = await getDownloadURL(snapshot.ref);
            return imgUrl;

        } catch (error) {
            return null;
        }
    }

    const handleSubmit2 = async (e) => {

        const profileImage = await getImageFile('/1.png', 'profile.jpeg');

        //upload user image
        const uploadPath = `images/${user.uid}/${profileImage?.name}`;
        const imageRef = ref(projectStorage, uploadPath);
        const imgUrl = await uploadImage(imageRef, profileImage);

        const doc = { name, age, imgUrl };
        addDocument({ ...doc, uid: user.uid });

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

        setThumbnail(selected);

    }

    return (
        <div className="container">
            {error && <p>{error}</p>}
            {documents && documents.map((item, i) => {
                return (
                    <Person key={i} item={item} />
                );
            })}

            <div className="form">
                <input value={name} onChange={e => setName(e.target.value)} placeholder='NAME' />
                <input value={age} onChange={e => setAge(e.target.value)} placeholder='AGE' />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit2}> Submit </button>
            </div>
        </div>
    );

};

export default People;