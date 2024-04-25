import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase";
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';
import '../home.css'
import abstract from '../assets/abstract.png'
import moment from 'moment';
import mhistory from '../assets/mhistory.png';


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

            <img className='mhistory' src={mhistory} alt="" srcset="" />

            <ul className='historydata'>
                {uploads.map((upload, index) => (
                    <li className='historyli' key={index}>

                        <div className='box1'>
                            Name: {upload.patientName} <br /><br />
                            Age: {upload.patientAge}<br /><br />
                            Blood: {upload.blood}<br /><br />
                            Additional info: {upload.additionalInfo}<br /><br />
                            Result:  {upload.result}<br /><br />
                            Time:                        {upload.timestamp && moment(upload.timestamp.toDate()).format('dddd DD MMMM YYYY hh:mm A')}

                        </div>
                        <div className='box2'>
                            <img src={upload.imageURL} alt="Uploaded Image" />

                        </div>



                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UploadsPage;
