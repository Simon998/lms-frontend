import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

const baseURL='http://127.0.0.1:8000/api';
function InstructorLogin(){
    const [teacherLoginData, setteacherLoginData] = useState({
        email: '',
        password: ''
    });

    const[errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value
        });
    }

    const submitForm = (event) => {
        event.preventDefault();
        
        const teacherFormData = new FormData();
        teacherFormData.append('email', teacherLoginData.email);
        teacherFormData.append('password', teacherLoginData.password);

        try {
            axios.post(baseURL +'/teacher-login', teacherFormData)
            .then((res)=>{
            if(res.data.bool==true){
                 localStorage.setItem('teacherLoginStatus', true);
                 localStorage.setItem('teacherId', res.data.teacher_id);
                 window.location.href = '/instructor-dashboard';
            }else{
                setErrorMsg('Invalid Email or Password');
            }
        })
        }catch (error) {
            console.log(error);
        }
        
    }
    
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus=='true'){
        window.location.href = '/instructor-dashboard';

    }
    useEffect(() => {
        document.title = 'Instructor Login'
    });
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h3 className="card-header" style={{ textAlign: 'center' }}>Instructor Login</h3>
                    <div className="card-body">
                        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={teacherLoginData.email} onChange={handleChange} type="email" id="email" name="email" className="form-control" autoComplete="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={teacherLoginData.password} onChange={handleChange} type="password" name="password" className="form-control" id="password"/>
                            </div>
                            {/*
                            <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
                            </div>
                            */}
                            <button type="submit" onClick={submitForm} className="btn btn-success">Login</button>
                            <p className="mt-4">
                                Don't have an account?{' '}
                                <Link to="/instructor-register" className="btn btn-primary">
                                    <i className="bi bi-r-square-fill"></i> Instructor Register
                                </Link>
                            </p>
                            {/*
                            <p className="mt-4">
                                Forgot Password?{' '}
                                <Link to="/instructor-forgot-password" className="btn btn-danger">
                                <i class="bi bi-patch-question"></i> Reset Password
                                </Link>
                            </p>
                            
                            */}
                            
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorLogin;