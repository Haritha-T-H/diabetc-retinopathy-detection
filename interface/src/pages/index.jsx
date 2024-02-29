import { useCallback, useRef, useState, useEffect } from "react";
import '../home.css';
import { Link } from "react-router-dom";
import eye from '../assets/raw.png'
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';
import { setDoc, doc, serverTimestamp, arrayUnion, Timestamp } from 'firebase/firestore';
import { db, storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Home = () => {
    const { userLoggedIn } = useAuth()
    const { currentUser } = useAuth()

    console.log("userLoggedIn")
    console.log(currentUser)
    console.log("userLoggedIn")
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);

    const [imageurl, setImageurl] = useState(null);
    const [percentage, setPercentage] = useState(null);

    const uploadFile = () => {
        const img_unique_id = uuid();
        const storageRef = ref(storage, img_unique_id);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setPercentage(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageurl(downloadURL);
                    console.log('completed')
                    console.log(downloadURL)
                    console.log('completed')
                    handleUpload(downloadURL);
                });
            }
        );
    };

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }, [file]);

    const handleReload = () => {
        window.location.reload();
    };

    const handleUpload = async (downloadURL) => {

        if (file != null) {
            console.log('calling')
            const imageData = new FormData();
            imageData.append('image', file);
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: imageData,
            });
            console.log('send')
            const data = await response.json();
            console.log(data.result.data['result'])
            setResult(data.result.data['result'])

            console.log('writing')
            const userDocRef = doc(db, "users", currentUser.email);
            console.log(imageurl)
            console.log(data.result.data['result'])
            await setDoc(userDocRef, {
                uploads: arrayUnion({
                    imageURL: downloadURL,
                    result: data.result.data['result'],
                    timestamp: Timestamp.now(),
                }),
            }, { merge: true });
            console.log('Upload details stored in Firestore');
        }
    };

    return (
        <div className='pagecontainer'>
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <div className="bgcontainer">
                <div className="box">
                    <div className="formcontainer">
                        {preview && <img src={preview} alt="Preview" />}
                        {!preview && <label for="fileInput" id="dropArea">
                            <input type="file" id="fileInput" accept="image/*" hidden name="image" onChange={(e) => {
                                setFile(e.target.files[0])
                            }} />
                            <div id="img-view">
                                <p>pick an image</p>
                            </div>
                        </label>
                        }
                        {preview && <button className="upload" onClick={uploadFile}>
                            Predict 🔍
                        </button>
                        }
                        {result && <button className="upload">
                            Image indicates {result}
                        </button>
                        }

                        {!preview && <button className="upload">
                            👈 click inside the box
                        </button>
                        }
                        {result && <button className="another" onClick={
                            handleReload
                        }>
                            check another 🔃
                        </button>
                        }


                    </div>

                </div>
                <div className="image">
                    <img src={eye} alt="" />
                </div>
                <div className="black"></div>

            </div>

        </div>
    )
}

export default Home