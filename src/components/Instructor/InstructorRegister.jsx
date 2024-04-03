import { Link} from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/teacher/';
function InstructorRegister(){
   const [teacherData, setTeacherData] = useState({
        'full_name': '',
        'email': '',
        'qualification': '',
        'mobile_no': '',
        'password': '',
        'skills': '',
        'status': ''
   });
   
   

   // change element input value
   const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
   }

   // submit form
   const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const teacherFormData = new FormData();
        teacherFormData.append('full_name', teacherData.full_name);
        teacherFormData.append('email', teacherData.email);
        teacherFormData.append('qualification', teacherData.qualification);
        teacherFormData.append('mobile_no', teacherData.mobile_no);
        teacherFormData.append('password', teacherData.password);
        teacherFormData.append('skills', teacherData.skills);

        axios.post(baseURL, teacherFormData)
        .then(response => {
            //alert('Registration successful'); // Alert when registration is successful
            setTeacherData ({
                'full_name': '',
                'email': '',
                'qualification': '',
                'mobile_no': '',
                'password': '',
                'skills': '',
                'status': 'true'
           }); 
           
        })
        .catch(error => {
            //alert('Registration failed'); // Alert when registration fails
            console.log(error); 
            setTeacherData({'status': 'false'});
        });
   };

   const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
   if(teacherLoginStatus=='true'){
       window.location.href = '/instructor-dashboard';

   }

   useEffect(() => {
    document.title = 'Instructor Register'
   });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {teacherData.status === 'true' && <div className="alert alert-success" role="alert">Registration successful</div>}
                    {teacherData.status === 'false' && <div className="alert alert-danger" role="alert">Registration failed</div>}
                    <div className="card">
                        <h3 className="card-header" style={{ textAlign: 'center' }}>Instructor Register</h3>
                        <div className="card-body">
                            {/* FORM */}
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">Full Name</label>
                                    <input value={teacherData.full_name} onChange={handleChange} type="text" id="full_name" name="full_name" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input value={teacherData.email} onChange={handleChange} type="email" id="email" name="email" className="form-control" autoComplete="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label">Qualification</label>
                                    <input value={teacherData.qualification} onChange={handleChange} type="text" id="qualification" name="qualification" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
                                    <input value={teacherData.mobile_no} onChange={handleChange} type="number" id="mobile_no" name="mobile_no" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input value={teacherData.password} onChange={handleChange} type="password" name="password" className="form-control" id="password"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label">Skills</label>
                                    <textarea value={teacherData.skills} onChange={handleChange} className="form-control" id="skills" name="skills"></textarea>
                                    <div className="formtext">Php, Data Science, Python, etc</div>
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>
                                <p className="mt-4">
                                    Already have an account?{' '}
                                    <Link to="/instructor-login" className="btn btn-primary">
                                        <i className="bi bi-box-arrow-in-left"></i> Login
                                    </Link>
                                </p>
                            </form>
                            {/* FORM */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorRegister;
