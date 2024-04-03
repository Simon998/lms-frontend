import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const baseURL = 'http://127.0.0.1:8000/api';

function ProfileSetting() {
   
    const [studentData, setstudentData] = useState({
        'full_name': '',
        'email': '',
        'username': '',
        'interested_categories': '',
        'profile_img': '',
        'p_img':'',
        'status': ''
    });

    // change element input value
    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.files[0]
        });
    }

    const studentId = localStorage.getItem('studentId');
    useEffect(() => {
        try{
            axios.get(baseURL + '/student/' + studentId + '/')
            .then((res) => {
                setstudentData({
                    full_name: res.data.full_name,
                    email: res.data.email,
                    username: res.data.username,
                    interested_categories: res.data.interested_categories,
                    profile_img: res.data.profile_img,
                    p_img: '',
                });
            })
        }catch(error){
                console.log("Error fetching student data:", error);
            };
    }, []);
    

    // submit form
    const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const studentFormData = new FormData();
        studentFormData.append('full_name', studentData.full_name);
        studentFormData.append('email', studentData.email);
        studentFormData.append('username', studentData.username);
        studentFormData.append('interested_categories', studentData.interested_categories);

        if (studentData.p_img!==''){
            studentFormData.append('profile_img', studentData.p_img, studentData.p_img.name);
        }
        

        try {
            axios.put(baseURL + '/student/' + studentId + '/', studentFormData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Profile has been updated',
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        }).then(() => {
                            // Reload the page after the toast message disappears
                            location.reload();
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
        document.title = 'Update Profile Settings';
    }, []);

    // Redirect to user login page if not logged in
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus !== 'true') {
         window.location.href = '/user-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card-body">
                        {/* FORM */}
                        <form onSubmit={submitForm}>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="form-label">Profile Image</label>
                                <input type="file" onChange={handleFileChange} name="p_img" className="form-control"></input>
                                {studentData.profile_img &&
                                    <img src={studentData.profile_img} className="img-thumbnail mt-2" style={{ height: '200px' , width: '250px' , borderRadius: '30px' }} alt={studentData.full_name} />
                                }
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="full_name" className="form-label">Full Name</label>
                                <input value={studentData.full_name} onChange={handleChange} type="text" id="full_name" name="full_name" className="form-control" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="form-label">Username</label>
                                <input value={studentData.username} onChange={handleChange} type="text" name="username" className="form-control" autoComplete="tel" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={studentData.email} onChange={handleChange} type="email" id="email" name="email" className="form-control" autoComplete="email" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="interested_categories" className="form-label">Interests</label>
                                <textarea value={studentData.interested_categories} onChange={handleChange} type="text" id="interested_categories" name="interested_categories" className="form-control" />
                                <div id="emailhelp" class="form-text">Php, Django Etc.....</div>
                            </div>
                            <button type="submit"  className="btn btn-primary">Update</button>
                        </form>
                        {/* FORM */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProfileSetting;
