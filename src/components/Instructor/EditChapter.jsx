import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';


function EditChapter() {
    const [chapterData, setChapterData] = useState({
        course:'',
        title: '',
        description: '',
        prev_video:'',
        video: '',
        remarks: ''
    });

     // change element input value
   const handleChange = (event) => {
    setChapterData({
        ...chapterData,
        [event.target.name]: event.target.value
    });
    }

   const handleFileChange = (event) => {
    setChapterData({
        ...chapterData,
        [event.target.name]: event.target.files[0]
    });
    }

    const {chapter_id} = useParams();

    // submit form
    const formsubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const _formData = new FormData();
        
        _formData.append('course', chapterData.course);
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        if (chapterData.video!==''){
            _formData.append('video', chapterData.video,chapterData.video.name);
        }
        
        _formData.append('remarks', chapterData.remarks);
    
        try{
            axios.put(baseURL+'/chapter/'+ chapter_id, _formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=> {
                if(res.status=200){
                        Swal.fire({
                            title: 'Data has been updated',
                        
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position:'top-right',
                            timerProgressBar:true,
                            showConfirmButton: 'false',
                            
                    })
                     
                
                }
            });
        }catch (error) {
            console.log(error);
            }
    
        };
        
    
        useEffect(() => {
            document.title="Edit Chapter";
        });
        //fetch courses
        useEffect(() => {
            try {
                axios.get(baseURL + '/chapter/' + chapter_id)
                    .then((res) => {
                        setChapterData({
                            course: res.data.course,
                            title: res.data.title,
                            description: res.data.description,
                            prev_video: res.data.video,
                            remarks: res.data.remarks,
                            video: ''
                        });
                    });
            } catch (error) {
                console.log(error);
            }
        }, []);
        
        const handleDeleteClick = () => {
            Swal.fire({
                title: 'Confirm',
                text: 'Do you want to continue?',
                icon: 'warning',
                confirmButtonText: 'continue',
                showCancelButton: true
        })
        }   
    
   

  return (
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                <div className="col-9">
                <div className="card">
                    <h5 className="card-header">Edit Chapter</h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input  onChange={handleChange} type="text" value={chapterData.title} id="title" name="title" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea value={chapterData.description} onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="video" className="form-label">Video</label>
                                <input  onChange={handleFileChange} type="file" id="video" name="video" className="form-control"/>

                                {chapterData.prev_video &&
                                <video controls width="250" className='mt-2'>
                                <source src={chapterData.prev_video} type="video/webm" />

                                <source src={chapterData.prev_video} type="video/mp4" />
                                </video>
                                }
                            </div>
                            <div className="mb-3">
                                <label for="vtechnologies" className="form-label">Remarks</label>
                                <textarea value={chapterData.remarks} onChange={handleChange} id="remarks" name="remarks" placeholder="This is a Php video..." className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
  )
}

export default EditChapter
