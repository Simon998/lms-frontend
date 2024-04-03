import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api';
function RecommendedCourses() {
    const [CourseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        //fetch courses
        try{
            axios.get(baseURL +'/fetch-recommended-courses/'+studentId)
            .then((res) => {
                setCourseData(res.data.results);
            })
        }catch (error) {
            console.log(error);
        }
    }, []);
  return (
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Recommended Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Techs in the course:</th>
                                </tr>
                            </thead>
                            <tbody>
                            {CourseData.map((course, index)=>
                                <tr>
                                    <td>
                                        
                                        <div style={{ textAlign: 'center' }}>
                                            <Link style={{ textDecoration: 'none', 
                                            color: 'black', 
                                            fontWeight: 'bold',
                                            display: 'inline-block',
                                            padding: '10px 20px',
                                            backgroundColor: 'lightgray',
                                            borderRadius: '5px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                            transition: 'background-color 0.3s ease',
                                            cursor: 'pointer',
                                            border: 'none', 
                                            width: '50%'
                                            }} to={`/detail/`+ course.id}>{course.title}
                                            </Link>
                                    </div>
                                     
                                    </td>
                                    <td>
                                    <div style={{ textAlign: 'center' }}>
                                        <div
                                            className="btn btn-info btn-md active" 
                                            style={{ width: '50%',textDecoration: 'none',color: 'black', fontWeight: 'bold'  }} >
                                             {course.techs}
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                            )}
                                
                            </tbody>
                        </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  )
}

export default RecommendedCourses
