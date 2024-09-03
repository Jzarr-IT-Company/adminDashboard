// import React, { useState } from 'react';
// import axios from 'axios';

// function AccessBtn({ coursesname }) {
//     const [loading, setLoading] = useState(false)
//     const accessBtn = async (data) => {
//         setLoading(true)
//         try {
//             axios.post('https://main-server-zeta.vercel.app/updateIsActive', {
//                 id: data.id,
//             }).then((res) => {
//                 if (res.status === 200) {
//                     axios.post('https://main-server-zeta.vercel.app/updateCourses', {
//                         id: data.id,
//                         coursename: data.coursesname
//                     }).then((res) => {
//                         console.log("DATA UPDATE", res)
//                         if (res.status === 200) {
//                             setLoading(false)
//                             return;
//                         }
//                     }).catch((error) => {
//                         setLoading(false)
//                         console.log("ERROR", error.message)
//                     })
//                 }
//             }).catch((error) => {
//                 setLoading(false)
//                 console.log("ERROR", error.message)
//             })
//         } catch (error) {
//             setLoading(false)
//             console.error('Error updating course:', error.message);
//         } finally {
//             setLoading(false)
//         }
//     };

//     const handleButtonClick = () => {
//         console.log(coursesname)
//         accessBtn(coursesname); 
//     };

//     return (
//         <>
//             <button className="btn btn-success" onClick={handleButtonClick}> {loading ? "Loading" : "Access"}</button>
//         </>
//     );
// }

// export default AccessBtn;


import React, { useState } from 'react';
import axios from 'axios';

function AccessBtn({ coursesname }) {
    const [loading, setLoading] = useState(false);

    const accessBtn = async (data) => {
        setLoading(true);
        try {
            await axios.post('https://admin-portal-server.vercel.app/updateIsActive', {
                id: data.id,
            });

            const response = await axios.post('https://admin-portal-server.vercel.app/updateCourses', {
                id: data.id,
                coursename: data.coursesname
            });

            console.log("DATA UPDATE", response);
        } catch (error) {
            console.error('Error updating course:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        console.log(coursesname);
        accessBtn(coursesname);
    };

    return (
        <button className="btn btn-success" onClick={handleButtonClick}>
            {loading ? "Loading" : "Access"}
        </button>
    );
}

export default AccessBtn;
