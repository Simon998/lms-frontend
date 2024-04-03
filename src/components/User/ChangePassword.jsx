import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const baseURL = 'http://127.0.0.1:8000/api';

function ChangePassword(){
    const [studentData, setstudentData] = useState({
        'password': '',
    });
    // change element input value
    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }
    
    const studentId = localStorage.getItem('studentId');
    // submit form
    const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const studentFormData = new FormData();
        studentFormData.append('password', studentData.password);

        try {
            axios.post(baseURL + '/student/change-password/' + studentId + '/', studentFormData,{
                })
                .then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Password has been updated',
                            icon: 'success',
                            toast: true,
                            timer: 1000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = '/user-logout';
                        });
                    }
                })
                
                
                .catch((error) => {
                    //alert('Registration failed'); // Alert when registration fails
                    console.log(error);
                    setstudentData({ 'status': 'false' });
                });
        } catch (error) {
            console.log(error);
            setstudentData({ 'status': 'false' });
        }
    }

    // Set document title
    useEffect(() => {
        document.title = 'Change Password';
    }, []);
     // Redirect to user login page if not logged in
     const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus !== 'true') {
          window.location.href = '/user-login';
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                    <section className="col-md-9">
                        <div className="card">
                        
                            <h5 className="card-header">Change Password</h5>
                            <div className="card-body">
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">New Password</label>
                                <div className="col-sm-10">
                                <input type="text" onChange={handleChange} value={studentData.password} name="password" readonly className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <hr/>
                            <button onClick={submitForm} className="btn btn-primary">Update</button>
                        </div>
                     </div>
                    </section>
            </div>
        </div>
    );
}

export default ChangePassword;