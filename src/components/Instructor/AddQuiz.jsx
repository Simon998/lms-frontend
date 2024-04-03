
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL='http://127.0.0.1:8000/api';
function AddQuiz(){

    const [quizData, setquizData] = useState({
        title: '',
        description: '',
    });

    
    // change element input value
   const handleChange = (event) => {
    setquizData({
        ...quizData,
        [event.target.name]: event.target.value
    });
    }

    const teacherId = localStorage.getItem('teacherId')

    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    
    _formData.append('teacher',teacherId);
    _formData.append('title', quizData.title);
    _formData.append('description', quizData.description);

    try{
        axios.post(baseURL+'/quiz/', _formData,{
        })
        .then((res)=> {
            //console.log(res.data);
            window.location.href = '/add-quiz';
        });
    }catch (error) {
        console.log(error);
        }

    };
    

    useEffect(() => {
        document.title="Add quiz";
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
                    <h5 className="card-header">Add quiz</h5>
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
                            <button onClick={formsubmit} className="btn btn-primary">Add quiz</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default AddQuiz;