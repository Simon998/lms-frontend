import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
//import swal from "sweetalert";
//import { useParams } from "react-router-dom";

const baseURL = 'http://127.0.0.1:8000/api';
function InstructorDashboard(){
    const [dashData, setdashData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        //fetch courses
        try{
            axios.get(baseURL + '/teacher/dashboard/' + teacherId + '/')
            .then((res) => {
                setdashData(res.data);
            })
        }catch (error) {
            console.log(error);
        }
    }, []);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar/>
                </aside>
                <section className="col-md-9">
                  <div className="row">
                  <div className="col-md-4">
                    <div className="card border-primary shadow" style={{ height: '250px' }}>
                        <h5 className="card-header bg-primary text-white">
                            Total Courses
                        </h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h3>Total Teacher Courses</h3>
                        </div>
                        <div className="mt-auto">
                        <h3>
                        <Link 
                        to='/instructor-courses' 
                        style={{ textDecoration: 'none' }}
                        className="btn btn-primary"
                        >
                        {dashData.total_teacher_courses}
                        </Link>
                        </h3>
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-success shadow" style={{ height: '250px' }}>
                        <h5 className="card-header bg-success text-white">
                            Total Students
                        </h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h3>Total Teacher Students</h3>
                        </div>
                        <div className="mt-auto">
                        <h3>
                        <Link 
                        to='/instructor-users' 
                        style={{ textDecoration: 'none' }}
                        className="btn btn-success"
                        >
                        {dashData.total_teacher_students}
                        </Link>
                        </h3>
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-info shadow" style={{ height: '250px' }}>
                        <h5 className="card-header bg-info text-white">
                            Total Chapters
                        </h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h3>Total Teacher Chapters</h3>
                        </div>
                        <div className="mt-auto">
                        <h3>
                        <Link 
                        to='/instructor-courses' 
                        style={{ textDecoration: 'none' }}
                        className="btn btn-info"
                        >
                        {dashData.total_teacher_chapters}
                        </Link>
                        </h3>
                        </div>
                        </div>
                    </div>
                  </div>
                  </div>
                </section>
            </div>
        </div>
    );
}

export default InstructorDashboard;