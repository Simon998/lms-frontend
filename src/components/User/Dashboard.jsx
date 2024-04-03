import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";


const baseURL = 'http://127.0.0.1:8000/api';
function Dashboard(){
    const [dashData, setdashData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        //fetch courses
        try{
            axios.get(baseURL + '/student/dashboard/' + studentId + '/')
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
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                  <div className="row">
                  <div className="col-md-4">
                    <div className="card border-primary shadow" style={{ height: '250px' }}>
                        <h5 className="card-header bg-primary text-white">
                            Enrolled Courses
                        </h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h3>Find your courses here</h3>
                        </div>
                        <div className="mt-auto">
                        <h3>
                        <Link 
                        to='/my-courses' 
                        style={{ textDecoration: 'none' }}
                        className="btn btn-primary"
                        >
                        {dashData.enrolled_courses}
                        </Link>
                        </h3>
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-success shadow" style={{ height: '250px' }}>
                        <h5 className="card-header bg-success text-white">
                            Favorite Courses
                        </h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h3>Find your favorite courses here</h3>
                        </div>
                        <div className="mt-auto">
                        <h3>
                        <Link 
                        to='/favorite-courses' 
                        style={{ textDecoration: 'none' }}
                        className="btn btn-success"
                        >
                        {dashData.favorite_courses}
                        </Link>
                        </h3>
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-info shadow" style={{ height: '250px' }}>
                        <h5 className="card-header bg-info text-white">
                            Assignments
                        </h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h3>Locate your assignments here</h3>
                        </div>
                        <div className="mt-auto">
                        <Link to='/my-assignments' className="btn btn-sm btn-success mt-2 ms-2"> Completed:
                        {dashData.complete_assignments}
                        </Link >
                        <Link to='/my-assignments' className="btn btn-sm btn-danger mt-2 ms-2"> Pending:
                        {dashData.pending_assignments}
                        </Link >
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

export default Dashboard;