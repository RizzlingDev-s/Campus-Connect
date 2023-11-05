import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: 20,
    Gender: 1,
    Stream: 1,
    Internships: 1,
    CGPA: 8,
    Certification: 4,
    HistoryOfBacklogs: 1
    
  });
  const url = 'https://ad95-34-91-108-103.ngrok.io/placement_prediction';

const input_data_for_model = {
    Age: 20,
    CGPA: 8,
    Stream: 1,
    Certification: 4,
    Internships: 1,
    HistoryOfBacklogs: 1,
    Gender: 1
};

const input_json = JSON.stringify(input_data_for_model);

fetch(url, {
    method: 'POST',
    body: input_json,
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data.result); // This will log the "result" value to the console
})
.catch(error => {
    console.error('Request failed:', error);
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue;
    // Handle Gender input: 1 for "male" and 0 for "female"
    if (name === "Gender") {
      updatedValue = value.toLowerCase() === "male" ? 1 : 0;
    }
    // Handle Stream input: Assign numerical values based on specified stream names
    else if (name === "Stream") {
      switch (value.toLowerCase()) {
        case "civil":
          updatedValue = 0;
          break;
        case "computer science":
          updatedValue = 1;
          break;
        case "electrical":
          updatedValue = 2;
          break;
        case "electronics and telecommunication":
          updatedValue = 3;
          break;
        case "information technology":
          updatedValue = 4;
          break;
        case "mechanical":
          updatedValue = 5;
          break;
        default:
          updatedValue = value;
      }
    }
    else {
      updatedValue = value;
    }
  
    setFormData({ ...formData, [name]: updatedValue });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://ad95-34-91-108-103.ngrok.io/placement_prediction',
        formData
      );

      console.log('Prediction Result:', response.data);
      // Handle the prediction result as needed
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div>
      <h1>Prediction Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="number"
            name="Gender"
            value={formData.Gender}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stream:
          <input
            type="string"
            name="Age"
            value={formData.Stream}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Internships:
          <input
            type="number"
            name="Internships"
            value={formData.Internships}
            onChange={handleInputChange}
          />
        </label>
        <label>
          CGPA:
          <input
            type="number"
            name="CGPA"
            value={formData.CGPA}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Certification:
          <input
            type="number"
            name="Certification"
            value={formData.Certification}
            onChange={handleInputChange}
          />
        </label>
        <label>
          HistoryOfBacklogs:
          <input
            type="number"
            name="HistoryOfBacklogs"
            value={formData.HistoryOfBacklogs}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PredictionForm;