import React from 'react'
import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';

function CourseChapters() {
    const [chapterData, setChapterData] = useState([]);

    const [totalResult, settotalResult] = useState(0);

    const {course_id} = useParams();
     //fetch courses
     useEffect(() => {
        try {
            axios.get(baseURL +'/course-chapters/'+course_id)
            .then((res)=>{
                settotalResult(res.data.length);
                setChapterData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
        
    },[]);

   
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this chapter?',
            icon: 'warning',
            confirmButtonText: 'continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseURL + '/chapter/' + chapter_id)
                        .then((res) => {
                            Swal.fire('Success!', 'Chapter has been deleted.' );
                            try{
                                axios.get(baseURL +'/course-chapters/'+course_id)
                                .then((res)=>{
                                    settotalResult(res.data.length);
                                    setChapterData(res.data);
                                });
                            }catch (error) {
                                console.log(error);
                            }
                            
                        });
                    
                } catch (error) {
                    Swal.fire('Error', 'Chapter has not been deleted.');
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
                        <h5 className="card-header">All Chapters ({totalResult}) <Link to={'/add-chapter/'+course_id} className="btn btn-primary btn-sm float-end "><i class="bi bi-file-plus"></i>Add Chapter</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Video</th>
                                    <th>Remarks:</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapterData.map((chapter, index)=>
                                <tr>
                                <td >
                                    <Link to={'/edit-chapter/'+chapter.id}  style={{ textDecoration: 'none'}}>
                                    {chapter.title}
                                    </Link>
                                </td>
                                <td >
                                <video controls width="250">
                                    <source src={chapter.video}type="video/webm" />

                                    <source src={chapter.video} type="video/mp4" />

                                    Download the
                                    <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                    or
                                    <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                    video.
                                </video>
                                </td>
                                <td >
                                {chapter.remarks}
                                </td>
                                <td>
                                    <Link to={'/edit-chapter/'+chapter.id} className="btn btn-info btn-sm  "><i class="bi bi-pencil square"></i>Edit</Link>
                                    <button onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-danger btn-sm ms-3"><i class="bi bi-trash"></i>Delete</button>
                                    
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

export default CourseChapters
