import React from 'react'
import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';

function StudyMaterial() {
    const [studyData, setstudyData] = useState([]);

    const [totalResult, settotalResult] = useState(0);

    const {course_id} = useParams();
     //fetch courses
     useEffect(() => {
        try {
            axios.get(baseURL +'/study-materials/'+course_id)
            .then((res)=>{
                settotalResult(res.data.length);
                setstudyData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
        
    },[]);

   
    const handleDeleteClick = (study_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this study?',
            icon: 'warning',
            confirmButtonText: 'continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseURL + '/study-material/' + study_id)
                        .then((res) => {
                            Swal.fire('Success!', 'study material has been deleted.' );
                            try{
                                axios.get(baseURL +'/study-materials/'+course_id)
                                .then((res)=>{
                                    settotalResult(res.data.length);
                                    setstudyData(res.data);
                                });
                            }catch (error) {
                                console.log(error);
                            }
                            
                        });
                    
                } catch (error) {
                    Swal.fire('Error', 'study has not been deleted.');
                }
            } else {
                Swal.fire('error', 'data has not been deleted.');
            }
        });
    };
      

  return (
    <>
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Study Materials ({totalResult}) <Link to={'/add-study-material/'+course_id} className="btn btn-primary btn-sm float-end "><i class="bi bi-file-plus"></i>Add study material</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Uploaded File</th>
                                    <th>Remarks:</th>
                                    <th>Action</th>
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
                                <td >
                                    <Link to={row.upload} style={{ textDecoration: 'none'}}className='btn btn-secondary bg-primary '>See File</Link>
                                </td>
                                <td >
                                <span className='text-info font-weight-bold'>{row.remarks}</span>
                                </td>
                                <td>
                                    <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-md "style={{ width: '100%' }}><i class="bi bi-trash"></i>Delete</button> 
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

export default StudyMaterial
