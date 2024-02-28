import { useCallback, useRef, useState, useEffect } from "react";
import '../home.css';
import { Link } from "react-router-dom";
import eye from '../assets/raw.png'

const Home = () => {
    const [file, setFile] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }, [file]);

    const handleReload = () => {
        window.location.reload();
    };

    const handleUpload = async () => {
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
            setAge(data.result.data['age']);
            setGender(data.result.data['gender']);
        }
    };

    return (
        <div class='pagecontainer'>

            <div class="bgcontainer">
                <div class="box">
                    <div class="formcontainer">
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
                        {preview && <button class="upload" onClick={handleUpload}>
                            Predict 👉
                        </button>
                        }
                        {!preview && <button class="upload">
                            👈 click inside the box
                        </button>
                        }
                    </div>

                </div>
                <div class="image">
                    <img src={eye} alt="" srcset="" />
                </div>
                <div class="black"></div>

            </div>

        </div>
    )
}

export default Home