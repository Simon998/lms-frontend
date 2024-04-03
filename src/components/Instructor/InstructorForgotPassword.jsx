
//not in use
import { useState, useEffect } from "react";
import axios from "axios";


const baseURL = 'http://127.0.0.1:8000/api';

function InstructorForgotPassword(){
    const [teacherData, setteacherData] = useState({
        'email': '',
    });
    // change element input value
    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    }
    const [successMsg, setsuccessMsg] = useState(''); // success message
    const [errorMsg, setErrorMsg] = useState(''); // error message
    
    //const teacherId = localStorage.getItem('teacherId');
    // submit form
    const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const teacherFormData = new FormData();
        teacherFormData.append('email', teacherData.email);

        axios.post(baseURL + '/teacher-forgot-password/', teacherFormData)
        .then((response) => {
            if (response.data.bool === true) {
                setsuccessMsg(response.data.msg); 
                setErrorMsg('');  
            } else {
                setErrorMsg(response.data.msg); 
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }

    // Set document title
    useEffect(() => {
        document.title = 'Reset Password';
    }, []);
   

    return(
        <div className="container mt-4">
            <div className="row">
            <section className="col-md-9 mx-auto">
                        <div className="card">
                        
                            <h5 className="card-header text-danger">Enter Your Registered Email</h5>
                            <div className="card-body mb-2">
                            {successMsg && <div className="alert alert-success">{successMsg}</div>}
                            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                <input type="text" onChange={handleChange} value={teacherData.email} name="email" className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <hr/>
                            <button onClick={submitForm} className="btn btn-primary">Send</button>
                        </div>
                     </div>
                    </section>
            </div>
        </div>
    );
}

export default InstructorForgotPassword;