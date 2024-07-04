import React from 'react'
import MainContext from './MainContext';

// export const baseUrl='http://localhost:5001';
export const baseUrl='https://task0-backend.onrender.com';

const MainState = (props) => {
    const getCountries=async(id)=>{
        let resp=await fetch(`${baseUrl}/location/getCountries`);
        let data=await resp.json();
        return data;
    };
    const getStatesByCountry =async(countryName)=>{
        let resp=await fetch(`${baseUrl}/location/getStatesByCountry?countryName=${countryName}`);
        let data=await resp.json();
        return data;
    };
    const getCitiesByState=async(stateName)=>{
        let resp=await fetch(`${baseUrl}/location/getCitiesByState?stateName=${stateName}`);
        let data=await resp.json();
        return data;
    };

    const getUser=async(id)=>{
        let resp=await fetch(`${baseUrl}/user/getUsers?id=${id}`);
        let data=await resp.json();
        return data;
    };
    
    const postUser=async({...formData})=>{
        let resp=await fetch(`${baseUrl}/user/postUser`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({...formData})
        });
        let data=await resp.json();
        return data;
    };

    return (
        <>
            <MainContext.Provider value={{getCountries, getStatesByCountry, getCitiesByState, postUser, getUser}}>
                {props.children}
            </MainContext.Provider>
        </>
    );
};

export default MainState
