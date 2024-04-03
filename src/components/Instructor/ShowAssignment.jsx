import React from 'react'
import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';

function ShowAssignment() {
    const [assignmentData, setassignmentData] = useState([]);
    
    const [totalResult, settotalResult] = useState(0);
    
    const {student_id} = useParams();
    const {teacher_id} = useParams();
     //fetch courses
     useEffect(() => {
        try {
            axios.get(baseURL +'/student-assignment/'+teacher_id+'/'+student_id)
            .then((res)=>{
                settotalResult(res.data.length);
                setassignmentData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
        
    },[]);


  return (
    <>
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Assignments({totalResult}) <Link to={`/add-assignment/${student_id}/${teacher_id}`}className="btn btn-secondary btn-sm float-end "><i class="bi bi-file-plus"></i>Add Assignment</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Assignment and Comments</th>
                                    <th>Assignment status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentData.map((row, index)=>
                                <tr>
                                <td >
                                    {row.title}
                                </td>
                                <td >
                                    {row.detail}
                                </td>
                                <td >
                                    {row.student_status==false &&
                                    <button className='btn btn-danger btn-md'>Assignment Pending!</button>
                                    }
                                    {row.student_status==true &&
                                    <button className='btn btn-success btn-md'>Assignment Completed!</button>
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
        </>
  )
}

export default ShowAssignment
