import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect} from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/student/';

function Register() {
  const [studentData, setstudentData] = useState({
    'full_name': '',
    'email': '',
    'username':'',
    'password': '',
    'interested_categories': '',
    'status': ''
});

  // change element input value
  const handleChange = (event) => {
    setstudentData({
        ...studentData,
        [event.target.name]: event.target.value
    });
}

 // submit form
 const submitForm = (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const studentFormData = new FormData();
  studentFormData.append('full_name', studentData.full_name);
  studentFormData.append('email', studentData.email);
  studentFormData.append('username', studentData.username);
  studentFormData.append('password', studentData.password);
  studentFormData.append('interested_categories', studentData.interested_categories);

  axios.post(baseURL, studentFormData)
  .then(response => {
      //alert('Registration successful'); // Alert when registration is successful
      setstudentData ({
          'full_name': '',
          'email': '',
          'username': '',
          'password': '',
          'interested_categories': '',
          'status': 'true'
     }); 
     
  })
  .catch(error => {
      //alert('Registration failed'); // Alert when registration fails
      console.log(error); 
      setstudentData({'status': 'false'});
  });
};

//const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
//if(teacherLoginStatus=='true'){
 //window.location.href = '/instructor-dashboard';

//}

useEffect(() => {
document.title = 'User Register'
});

  return (
    <div className='container mt-5'>
    <div className='row'>
          <div className='col-6 offset-3'>
              {studentData.status === 'true' && <div className="alert alert-success" role="alert">Registration successful</div>}
              {studentData.status === 'false' && <div className="alert alert-danger" role="alert">Registration failed</div>}
              <div className='card'>
              <h5 className='card-header' style={{ textAlign: 'center' }}>User Register</h5>
              <div className='card-body'>
              {/*<form>*/}
                        <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Full Name </label>
                        <input value={studentData.full_name} onChange={handleChange} type="text" name='full_name' className="form-control" />
                        </div>
                        <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input value={studentData.email}  onChange={handleChange} type="email" name='email' className="form-control" />
                        </div>
                        <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Username</label>
                        <input value={studentData.username}  onChange={handleChange} type="text" name='username' className="form-control" />
                        </div>
                        <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input value={studentData.password}  onChange={handleChange} type="password" name='password' className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Interests</label>
                        <textarea value={studentData.interested_categories}  onChange={handleChange} name='interested_categories' className="form-control"></textarea>
                        <div id="emailHelp" className="formtext">Php, Data Science, Python, etc</div>
                        </div>
                        <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>
                        <p className="mt-4">
                            Already have an account?{' '}
                            <Link to="/user-login" className="btn btn-primary">
                                <i class="bi bi-box-arrow-in-left"></i> Login
                            </Link>
                        </p>
                    {/*<form>*/}
              </div>
              </div>
          </div>
    </div> 
</div>
  )
}

export default Register
