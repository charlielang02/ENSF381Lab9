import React, { useState } from 'react';
import './predictor.css';

const Predictor = () => {
    const [formData, setFormData] = useState({
        city: '',
        province: '',
        latitude: '',
        longitude: '',
        lease_term: '',
        type: '',
        beds: '',
        baths: '',
        sq_feet: '',
        furnishing: 'Unfurnished',
        smoking: 'No',
        pets: false,
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict_house_price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setPrediction(data.predicted_price);
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>House Price Predictor</h2>
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <label>Province</label>
                <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                />

                <label>Latitude</label>
                <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                />

                <label>Longitude</label>
                <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                />

                <label>Lease Term</label>
                <input
                    type="text"
                    name="lease_term"
                    value={formData.lease_term}
                    onChange={handleChange}
                    required
                />

                <label>Type of House</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />

                <label>Number of Beds</label>
                <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    required
                />

                <label>Number of Baths</label>
                <input
                    type="number"
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    required
                />

                <label>Square Feet</label>
                <input
                    type="number"
                    name="sq_feet"
                    value={formData.sq_feet}
                    onChange={handleChange}
                    required
                />

                <label>Furnishing</label>
                <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    required
                >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Partially Furnished">Partially Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                </select>

                <label>Smoking</label>
                <select
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleChange}
                    required
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>

                <label className="checkbox-container">
                    I Have a Pet
                    <input
                        type="checkbox"
                        name="pets"
                        checked={formData.pets}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Predict</button>
            </form>

            {prediction && (
                <div className="prediction-box">
                    Predicted Rent Price: ${prediction}
                </div>
            )}
        </div>
    );
};

export default Predictor;