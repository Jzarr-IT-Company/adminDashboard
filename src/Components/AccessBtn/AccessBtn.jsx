import React from 'react';
import axios from 'axios';

function AccessBtn({ id, coursesname }) {
    // Convert the comma-separated string into an array
    const coursesArray = coursesname.split(',');

    // Function to handle the API call or any action for each course
    const accessBtn = async (courseName) => {
        console.log(`Processing course: ${courseName}`);

        try {
            // Example API call to update the course's isActive status
            const response = await axios.post('http://localhost:8888/updateIsActive', {
                id: id,
                coursename: courseName // Use the individual course name here
            });
            console.log('API Response:', response);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    // Function to handle the button click
    const handleButtonClick = () => {
        coursesArray.forEach((courseName) => {
            accessBtn(courseName); // Call accessBtn for each course name
        });
    };

    return (
        <>
            <button className="btn btn-success" onClick={handleButtonClick}>Access</button>
        </>
    );
}

export default AccessBtn;
