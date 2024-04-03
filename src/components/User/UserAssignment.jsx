import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api';
function UserAssignment() {
    const [assignmentData, setassignmentData] = useState([]);
    const [assignmentStatus, setassignmentStatus] = useState('');
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        //fetch courses
        try{
            axios.get(baseURL +'/my-assignments/'+studentId)
            .then((res) => {
                setassignmentData(res.data);
            })
        }catch (error) {
            console.log(error);
        }
    }, []);

    
    const markasDone=(assignment_id,title,detail,student,teacher)=>{
        const _formData = new FormData();
        _formData.append('student_status', true);
        _formData.append('title', title);
        _formData.append('detail', detail);
        _formData.append('student', student);
        _formData.append('teacher', teacher);

        
    
        try{
            axios.put(baseURL+'/update-assignment/'+assignment_id, _formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=> {
                if(res.status===200 || res.status===201){
        
                    window.location.reload();
                }
        
            });
        }catch (error) {
            console.log(error);
            }
    }
  return (
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Assignments</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Assignment</th>
                                    <th>Comment</th>
                                    <th>Teacher</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentData.map((row, index)=>
                                <tr>
                                    <td>
                                        <div style={{ textAlign: 'center' }}>
                                        <div
                                            className="btn btn-primary btn-md active" 
                                            style={{ width: '100%',textDecoration: 'none',color: 'black', fontWeight: 'bold'  }} >
                                           {row.title}
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center' }}>
                                        <div
                                            className="btn btn-warning btn-md active" 
                                            style={{ width: '100%',fontWeight: 'bold'  }} >
                                            {row.detail}
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    <div style={{ textAlign: 'center' }}>
                                        <button 
                                            className="btn btn-info btn-md active" 
                                            style={{ width: '100%', }} >
                                            <Link style={{ textDecoration: 'none',color: 'black', fontWeight: 'bold' 
                                            }} to={`/instructor-detail/`+ row.teacher.id}>{row.teacher.full_name}</Link>
                                        </button>
                                    </div>
                                    </td>
                                    <td>
                                        {/* 
                                        {assignmentStatus!=='success' &&
                                        <button className='btn btn-md btn-secondary'>Upload File</button>
                                        }
                                        */}
                                        {row.student_status==false &&
                                        <button onClick={()=>markasDone(row.id,row.title,row.detail,row.student.id,row.teacher.id)} className='btn btn-md btn-success ms-2'>Mark as done</button>
                                        }
                                        {row.student_status==true &&
                                         <button className='btn btn-danger btn-md'>Assignment Completed!</button>
                                        }
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

export default UserAssignment
