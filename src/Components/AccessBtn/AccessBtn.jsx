import React from 'react';
import axios from 'axios';

function AccessBtn({ coursesname }) {
    // Convert the comma-separated string into an array
    // const coursesArray = coursesname.split(',');

    // Function to handle the API call or any action for each course
    const accessBtn = async (id, courseName) => {
        console.log(`Processing course: ${courseName}`);
        console.log(`Processing course id: ${id}`);

        try {

            axios.post('http://localhost:8888/updateIsActive', {
                id: id,
            }).then((res) => {
                if (res.status === 200) {
                    axios.post('http://localhost:8888/updateCourses', {
                        id: id,
                        coursename: courseName

                    }).then((res) => {
                        console.log(res)
                    })
                }
            })
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    // // Function to handle the button click
    const handleButtonClick = () => {
        console.log(coursesname)
        accessBtn(coursesname.id, coursesname.coursesname); // Call accessBtn for each course name

    };

    return (
        <>
            <button className="btn btn-success" onClick={handleButtonClick}>Access</button>
        </>
    );
}

export default AccessBtn;
