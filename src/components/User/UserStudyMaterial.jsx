import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';

function UserStudyMaterial() {
    const [studyData, setstudyData] = useState([]);

    const [totalResult, settotalResult] = useState(0);

    const {course_id} = useParams();
     //fetch courses
     useEffect(() => {
        try {
            axios.get(baseURL +'/user/study-materials/'+course_id)
            .then((res)=>{
                settotalResult(res.data.length);
                setstudyData(res.data);
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
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Study Materials ({totalResult})</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Uploaded File</th>
                                    <th>Remarks:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studyData.map((row, index)=>
                                <tr>
                                <td >
                                    <div style={{ textDecoration: 'none'}}>
                                    <div className='btn btn-secondary bg-dark' style={{color:'white'}}>{row.title}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className='text-dark font-weight-bold'>{row.description}</span>
                                </td>
                                <td >
                                    <Link to={row.upload} style={{ textDecoration: 'none'}}className='btn btn-secondary bg-primary '>See File</Link>
                                </td>
                                <td >
                                <span className='text-info font-weight-bold'>{row.remarks}</span>
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

export default UserStudyMaterial
