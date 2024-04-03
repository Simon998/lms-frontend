
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';
function EditQuiz(){

    const [quizData, setquizData] = useState({
        title: '',
        description: '',
       
    });
    const teacherId = localStorage.getItem('teacherId')
    const { quiz_id } = useParams();
    //fetch quiz when page loads
    useEffect(() => {
        //fetc quiz data
        try {
            axios.get(baseURL + '/teacher-quiz-detail/' + quiz_id)
                .then((res) => {
                    setquizData({
                        title: res.data.title,
                        description: res.data.description,
                    });
                });
        } catch (error) {
            console.log(error);
        }
        
    },[]);

    // change element input value
   const handleChange = (event) => {
    setquizData({
        ...quizData,
        [event.target.name]: event.target.value
    });
    }


    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    _formData.append('teacher', teacherId);
    _formData.append('title', quizData.title);
    _formData.append('description', quizData.description);

    try{
        axios.put(baseURL+'/teacher-quiz-detail/' + quiz_id, _formData,{
        })
        .then((res)=> {
            if(res.status=200){
                Swal.fire({
                    title: 'quiz has been updated',
                
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: false
                    
            })
             
        
        }
        });
    }catch (error) {
        console.log(error);
        }

    };
    

    useEffect(() => {
        document.title="Edit quiz";
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
                    <h5 className="card-header">Edit quiz</h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input  value={quizData.title} onChange={handleChange} type="text" id="title" name="title" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea  value={quizData.description} onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-success">Save Changes</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default EditQuiz;