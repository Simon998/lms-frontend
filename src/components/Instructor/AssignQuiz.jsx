import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import CheckQuizInCourse from "./CheckQuizInCourse";
import { useParams } from 'react-router-dom';
import axios from "axios";

const baseURL='http://127.0.0.1:8000/api';
function AssignQuiz(){

    const [quizData, setquizData] = useState([]);
    const [courseData, setcourseData] = useState([]);
    const {course_id} = useParams();

    const teacherId = localStorage.getItem('teacherId')
    //console.log (teacherId);

     //fetch quizs
     useEffect(() => {
        try {
            axios.get(baseURL +'/teacher-quiz/'+teacherId)
            .then((res)=>{
                setquizData(res.data);
        })
        }catch (error) {
            console.log(error);
        }

        try {
            axios.get(baseURL +'/course/'+course_id)
                .then((res)=>{
                    setcourseData(res.data);
                    
        });
        }catch (error) {
            console.log(error);
        }

    },[]);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Assign Quiz <span className="text-primary">({courseData.title})</span></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row, index)=>
                                
                                <tr>
                                <td >
                                    <Link to={`/all-questions/`+ row.id} >
                                    <button style={{ backgroundColor: 'grey', textDecoration: 'none', color: 'black', border: 'none', padding: '5px 20px', borderRadius: '5px', cursor: 'pointer', width: '70%' }}>{row.title}</button>
                                    </Link>
                                </td>
                                <td>
                                    <CheckQuizInCourse quiz={row.id} course={course_id}/>
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
    );
}

export default AssignQuiz;