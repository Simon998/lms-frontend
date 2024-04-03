import { Link } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2';


const baseURL='http://127.0.0.1:8000/api';
function AddChapter(){
    
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
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

    const {course_id} = useParams();
    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    
    _formData.append('course', course_id);
    _formData.append('title', chapterData.title);
    _formData.append('description', chapterData.description);
    _formData.append('video', chapterData.video,chapterData.video.name);
    _formData.append('remarks', chapterData.remarks);

    try{
        axios.post(baseURL+'/chapter/', _formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=> {
            if(res.status===201){
                Swal.fire({
                    title: 'Chapter has been added successfully!',
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: 'false',
                    
            })
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        
        
        }
        });
    }catch (error) {
        console.log(error);
        }

    };
    

    useEffect(() => {
        document.title="Add Chapter";
    });

    //console.log(cats);
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                <div className="col-9">
                <div className="card">
                    <h5 className="card-header">Add Chapter</h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input onChange={handleChange} type="text" id="title" name="title" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="video" className="form-label">Video</label>
                                <input onChange={handleFileChange} type="file" id="video" name="video" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="vtechnologies" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} id="remarks" name="remarks" placeholder="This is a Php video..." className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-primary">Add Chapter</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default AddChapter;