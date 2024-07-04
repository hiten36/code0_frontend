import React, { useState, useEffect } from 'react';
import { useMain } from './hooks/useMain';
import { useNavigate } from 'react-router-dom';

var age1;
const Form = () => {
    const { getCountries, getStatesByCountry, getCitiesByState, postUser } = useMain();

    const navigation=useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        state: '',
        city: '',
        gender: '',
        dob: '',
        age: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const ans = await getCountries();
                console.log(ans);
                setCountries(ans.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = async (event) => {
        const selectedCountry = event.target.value;
        setFormData({ ...formData, country: selectedCountry, state: '', city: '' });

        try {
            const response = await getStatesByCountry(selectedCountry);
            setStates(response.data);
            setCities([]);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const handleStateChange = async (event) => {
        const selectedState = event.target.value;
        setFormData({ ...formData, state: selectedState, city: '' });

        try {
            const response = await getCitiesByState(selectedState);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z]+$/;
        const ageRegex = /^(1[5-9]|[2-9][0-9])$/; // Age between 15 and 99

        if (!formData.firstName.match(nameRegex)) {
            errors.firstName = 'First Name must accept alphabets only';
        }
        if (!formData.lastName.match(nameRegex)) {
            errors.lastName = 'Last Name must accept alphabets only';
        }
        if (!formData.email.match(emailRegex)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.country) {
            errors.country = 'Please select a country';
        }
        if (!formData.state) {
            errors.state = 'Please select a state';
        }
        if (!formData.city) {
            errors.city = 'Please select a city';
        }
        if (!formData.gender) {
            errors.gender = 'Please select gender';
        }
        if (!formData.dob) {
            errors.dob = 'Please enter Date of Birth';
        } else {
            // Validate age based on Date of Birth
            let today = new Date();
            let birthDate = new Date(formData.dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            let monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (!(ageRegex.test(age.toString()))) {
                errors.dob = 'Age must be between 15 and 99 years';
            } else {
                age1 = age;
                setFormData({ ...formData, age });
            }
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                console.log(age1);
                const response = await postUser({ ...formData, age: age1 });
                alert(response.message);

                if(response.status)
                {
                    console.log('Data saved successfully:', response.data);
                
                    navigation(`/display/${response.data?._id}`);
                }
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                </div>

                <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                <div>
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-700">Country:</label>
                    <select
                        id="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                    {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
                </div>

                <div>
                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-700">State:</label>
                    <select
                        id="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state.name}>{state.name}</option>
                        ))}
                    </select>
                    {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
                </div>

                <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">City:</label>
                    <select
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                </div>

                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-700">Gender:</span>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input
                                type="radio"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                required
                                className="focus:ring focus:ring-blue-500"
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                required
                                className="focus:ring focus:ring-blue-500"
                            /> Female
                        </label>
                    </div>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                <div>
                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        required
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
                </div>

                <div>
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-700">Age:</label>
                    <input
                        type="text"
                        id="age"
                        value={formData.age}
                        readOnly
                        className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:ring focus:ring-blue-500">
                    Save
                </button>
            </form>
        </div>
    );
};

export default Form;
