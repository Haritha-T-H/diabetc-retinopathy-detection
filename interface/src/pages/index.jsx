import { useCallback, useRef, useState, useEffect } from "react";
import '../home.css';
import { Link } from "react-router-dom";
import eye from '../assets/raw.png'
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const { userLoggedIn } = useAuth()

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);

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
            console.log(data.result.data['result'])
            setResult(data.result.data['result'])

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
                        {preview && <button className="upload" onClick={handleUpload}>
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