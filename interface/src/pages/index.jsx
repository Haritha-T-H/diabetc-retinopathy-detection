import { useCallback, useRef, useState, useEffect } from "react";
import '../home.css';
import { Link } from "react-router-dom";
import eye from '../assets/raw.png'
import abstract from '../assets/abstract.png'
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';
import { setDoc, doc, serverTimestamp, arrayUnion, Timestamp, getDoc } from 'firebase/firestore';
import { db, storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Home = () => {
    const { userLoggedIn } = useAuth()
    const { currentUser } = useAuth()

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [patientName, setpatientName] = useState(null);
    const [patientAge, setpatientAge] = useState('');
    const [additionalInfo, setadditionalInfo] = useState(null);
    const [username, setUsername] = useState('');
    const [imageurl, setImageurl] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [gender, setGender] = useState('male');
    const [blood, setblood] = useState('A+');

    const uploadFile = () => {
        if (patientAge != '' && patientName) {
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
                        handleUpload(downloadURL);
                    });
                }
            );
        } else {
            console.log(patientAge)
            console.log(patientName)
            alert("Fill patients details")
        }
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


    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };


    const handleBloodGroupChange = (event) => {
        setblood(event.target.value);
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


            const userDocRef = doc(db, "users", currentUser.email);
            console.log(imageurl)
            console.log(data.result.data['result'])
            await setDoc(userDocRef, {

                uploads: arrayUnion({
                    patientName: patientName,
                    patientAge: patientAge,
                    patientGender: gender,
                    additionalInfo: additionalInfo,
                    imageURL: downloadURL,
                    blood: blood,
                    result: data.result.data['result'],
                    timestamp: Timestamp.now(),
                }),
            }, { merge: true });
            setpatientName('')
            setpatientAge('')
            setadditionalInfo('')
            console.log('Upload details stored in Firestore');
        }
    };


    useEffect(() => {
        const fetchUsername = async () => {
            const userDocRef = doc(db, "users", currentUser.email);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                setUsername(userData.name);
                console.log(userData.name)
            }

            console.log(currentUser.email)
        };

        if (currentUser) {
            fetchUsername();
        }
    }, [currentUser]);
    return (
        <div >
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <div class="container">
                <div class="left">
                    {!preview && !result && <>
                        <h1>Hello, {username}</h1>
                        <h1 className="drd">Diabetic Retinopathy <strong className="detec">Detection</strong></h1>
                        <br />
                        <h4>
                            Diabetic retinopathy is a serious complication of diabetes that affects the eyes, leading to potential vision loss and blindness if left untreated.
                        </h4>
                        <br />

                        <button className="steps">Step 1. Pick an Image</button>
                        <br />
                        <button className="steps">Step 2. Enter patient details</button>
                        <br />
                        <button className="steps">Step 3. Check result</button>
                    </>}

                    {preview && !result && <form >
                        <input type="text" className="form-control" placeholder="Patient Name" required onChange={(e) => { setpatientName(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="Patient Age" required onChange={(e) => { setpatientAge(e.target.value) }} />
                        <select value={gender} className="form-control genderpick" onChange={handleGenderChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select value={blood} className="form-control genderpick" onChange={handleBloodGroupChange}>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        <input type="text" className="form-control" placeholder="Additional information" required onChange={(e) => { setadditionalInfo(e.target.value) }} />
                    </form>}

                    {preview && !result && <button className="upload" onClick={uploadFile}>
                        Predict 🔍
                    </button>
                    }

                    {result && <h2>
                        Image indicates {result}
                    </h2>
                    }

                    {result && result == "mild" && <h2>
                        This suggests a less severe form of the condition.

                    </h2>}

                    {result && result == "moderate" && <h2>
                        This indicates a more advanced stage compared to "mild" but not the most severe.
                    </h2>}

                    {result && result == "no diabetic retinopathy" && <h2>
                        I couldnt find any issue.
                    </h2>}

                    {result && result == "proliferative" && <h2>
                        This is a more serious stage where abnormal blood vessel growth occurs in the retina.
                    </h2>}

                    {result && result == "severe" && <h2>
                        This is the most advanced and potentially sight-threatening stage of diabetic retinopathy.
                    </h2>}

                    {preview && result && <button className="upload" onClick={
                        handleReload
                    }>
                        Check another
                    </button>
                    }

                </div>
                <img src={abstract} id="abstract" alt="" />
                <div class="right">
                    {preview && <img src={preview} alt="Preview" />}
                    {!preview && <label for="fileInput" id="dropArea">
                        <input type="file" id="fileInput" accept="image/*" hidden name="image" onChange={(e) => {
                            setFile(e.target.files[0])
                        }} />
                        <div id="img-view">
                            <p>click here to upload an image</p>
                        </div>
                    </label>}

                </div>
            </div>



        </div>
    )
}

export default Home