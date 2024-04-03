import { Link } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2';


const baseURL='http://127.0.0.1:8000/api';
function AddStudyMaterial(){
    
    const [studyData, setstudyData] = useState({
        title: '',
        description: '',
        upload: '',
        remarks: ''
    });
   

    
    // change element input value
   const handleChange = (event) => {
    setstudyData({
        ...studyData,
        [event.target.name]: event.target.value
    });
    }

   const handleFileChange = (event) => {
      window.URL = window.URL || window.webkitURL;
      var upload = document.createElement('upload');
      upload.src = URL.createObjectURL(event.target.files[0]);

      setstudyData({
        ...studyData,
        [event.target.name]: event.target.files[0]
      });
    }

    const {course_id} = useParams();
    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    
    _formData.append('course', course_id);
    _formData.append('title', studyData.title);
    _formData.append('description', studyData.description);
    _formData.append('upload', studyData.upload, studyData.upload.name);
    _formData.append('remarks', studyData.remarks);

    try{
        axios.post(baseURL+'/study-materials/'+course_id, _formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=> {
            if(res.status===200 || res.status===201){
                Swal.fire({
                    title: 'study material has been added successfully!',
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
        document.title="Add study material";
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
                    <h5 className="card-header">Add Study Material</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input onChange={handleChange} type="text" id="title" name="title" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="upload" className="form-label">upload file</label>
                                <input onChange={handleFileChange} type="file" id="upload" name="upload" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="vtechnologies" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} id="remarks" name="remarks" placeholder="Go through the uploaded notes..." className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-primary">Add study</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default AddStudyMaterial;