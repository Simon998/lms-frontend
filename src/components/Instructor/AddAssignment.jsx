import { Link } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2';


const baseURL='http://127.0.0.1:8000/api';
function AddAssignment(){
    
    const [assignmentData, setassignmentData] = useState({
        title: '',
        detail: ''
    });
   

    
    // change element input value
   const handleChange = (event) => {
    setassignmentData({
        ...assignmentData,
        [event.target.name]: event.target.value
    });
    }


    const {teacher_id} = useParams();
    const {student_id} = useParams();
    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    
    _formData.append('title', assignmentData.title);
    _formData.append('detail', assignmentData.detail);
    _formData.append('teacher', teacher_id);
    _formData.append('student', student_id);

    try{
        axios.post(baseURL+'/student-assignment/'+teacher_id+'/'+student_id , _formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=> {
            if(res.status===201){
                Swal.fire({
                    title: 'Assignment has been added successfully!',
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: 'false',
                    
            })
            
            const _notifData = new FormData();
            _notifData.append('teacher', teacher_id);
            _notifData.append('notif_subject', notif_subject);
            _notifData.append('notif_for', 'student');
            _notifData.append('student', student_id);

            axios.post(baseURL+'/save-notification/', _notifData)
                .then((res)=> {
                    console.log('Notification has been sent successfully!')
                })
                .catch((error) => {
                    console.error('Error sending notification:', error);
            });

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
        document.title="Add Assignment";
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
                    <h5 className="card-header">Add Assignment</h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input onChange={handleChange} type="text" id="title" name="title" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="detail" className="form-label">Type the assignment and add comments</label>
                                <textarea onChange={handleChange} id="detail" name="detail" className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-success">Add Assignment</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default AddAssignment;