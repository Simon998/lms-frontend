import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const baseURL = 'http://127.0.0.1:8000/api';

function InstructorProfileSetting() {
   
    const [teacherData, setteacherData] = useState({
        'full_name': '',
        'email': '',
        'qualification': '',
        'mobile_no': '',
        'skills': '',
        'detail': '',
        'profile_img': '',
        'p_img':'',
        'status': ''
    });

    // change element input value
    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0]
        });
    }

    const teacherId = localStorage.getItem('teacherId');
    useEffect(() => {
        try{
            axios.get(baseURL + '/teacher/' + teacherId + '/')
            .then((res) => {
                setteacherData({
                    full_name: res.data.full_name,
                    email: res.data.email,
                    qualification: res.data.qualification,
                    mobile_no: res.data.mobile_no,
                    skills: res.data.skills,
                    detail: res.data.detail,
                    profile_img: res.data.profile_img,
                    p_img: '',
                });
            })
        }catch(error){
                console.log("Error fetching teacher data:", error);
            };
    }, []);
    

    // submit form
    const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const teacherFormData = new FormData();
        teacherFormData.append('full_name', teacherData.full_name);
        teacherFormData.append('email', teacherData.email);
        teacherFormData.append('mobile_no', teacherData.mobile_no);
        teacherFormData.append('qualification', teacherData.qualification);
        teacherFormData.append('detail', teacherData.detail);
        teacherFormData.append('skills', teacherData.skills);

        if (teacherData.p_img!==''){
            teacherFormData.append('profile_img', teacherData.p_img, teacherData.p_img.name);
        }
        

        try {
            axios.put(baseURL + '/teacher/' + teacherId + '/', teacherFormData,{
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
                    setteacherData({ 'status': 'false' });
                });
        } catch (error) {
            console.log(error);
            setteacherData({ 'status': 'false' });
        }
    }

    // Set document title
    useEffect(() => {
        document.title = 'Update Profile Settings';
    }, []);

    // Redirect to instructor login page if not logged in
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus !== 'true') {
         window.location.href = '/instructor-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card-body">
                        {/* FORM */}
                        <form onSubmit={submitForm}>
                            <div className="mb-3 row">
                                <label htmlFor="full_name" className="form-label">Full Name</label>
                                <input value={teacherData.full_name} onChange={handleChange} type="text" id="full_name" name="full_name" className="form-control" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="form-label">Profile Image</label>
                                <input type="file" onChange={handleFileChange} name="p_img" className="form-control"></input>
                                {teacherData.profile_img &&
                                    <img src={teacherData.profile_img} className="img-thumbnail mt-2" style={{ height: '200px' , width: '250px' , borderRadius: '30px' }} alt={teacherData.full_name} />
                                }
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="form-label">Phone Number</label>
                                <input value={teacherData.mobile_no} onChange={handleChange} type="tel" name="mobile_no" className="form-control" autoComplete="tel" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="form-label">Bio</label>
                                <textarea value={teacherData.detail} onChange={handleChange} className="form-control" id="skills" name="detail"></textarea>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={teacherData.email} onChange={handleChange} type="email" id="email" name="email" className="form-control" autoComplete="email" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="qualification" className="form-label">Qualification</label>
                                <input value={teacherData.qualification} onChange={handleChange} type="text" id="qualification" name="qualification" className="form-control" />
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="skills" className="form-label">Skills</label>
                                <textarea value={teacherData.skills} onChange={handleChange} className="form-control" id="skills" name="skills"></textarea>
                                <div className="formtext">Php, Data Science, Python, etc</div>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                        {/* FORM */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default InstructorProfileSetting;
