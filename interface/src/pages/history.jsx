import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase";
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';

const UploadsPage = () => {
    const [uploads, setUploads] = useState([]);
    const { userLoggedIn } = useAuth()
    const { currentUser } = useAuth()
    useEffect(() => {
        const fetchData = async () => {

            try {

                const userDocRef = doc(db, 'users', currentUser.email);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userUploads = userDocSnapshot.data().uploads || [];
                    setUploads(userUploads);
                } else {
                    console.log('User document does not exist');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='uploadimages'>
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <h1>Your Uploads</h1>
            <ul>
                {uploads.map((upload, index) => (
                    <li className='historyli' key={index}>
                        <img src={upload.imageURL} alt="Uploaded Image" />
                        <h2>
                            {upload.result}
                        </h2>

                        <br />

                        {upload.timestamp && upload.timestamp.toDate().toString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UploadsPage;
