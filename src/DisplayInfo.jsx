import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMain } from './hooks/useMain';

const DisplayInfo = () => {
    const { getUser } = useMain();
    const {id}=useParams();

    const [value, setValue] = useState({});

    useEffect(()=>{
        if(id)
        {
            getData();
        }
    },[id]);

    const getData=async()=>{
        const response=await getUser(id);
        setValue(response.data?.[0]);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Submitted Information</h2>
                <div className="space-y-2">
                    <p><strong className="font-medium text-gray-700">First Name:</strong> {value?.firstName}</p>
                    <p><strong className="font-medium text-gray-700">Last Name:</strong> {value?.lastName}</p>
                    <p><strong className="font-medium text-gray-700">E-Mail:</strong> {value?.email}</p>
                    <p><strong className="font-medium text-gray-700">Country:</strong> {value?.country}</p>
                    <p><strong className="font-medium text-gray-700">State:</strong> {value?.state}</p>
                    <p><strong className="font-medium text-gray-700">City:</strong> {value?.city}</p>
                    <p><strong className="font-medium text-gray-700">Gender:</strong> {value?.gender}</p>
                    <p><strong className="font-medium text-gray-700">Date of Birth:</strong> {value?.dob}</p>
                    <p><strong className="font-medium text-gray-700">Age:</strong> {value?.age}</p>
                </div>
            </div>
        </div>
    );
};

export default DisplayInfo;
