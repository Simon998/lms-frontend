import React from 'react'
import Sidebar from "./Sidebar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import CheckQuizStatusForStudents from './CheckQuizStatusForStudents';

const baseURL = 'http://127.0.0.1:8000/api';
function CourseQuizList() {
    const [quizData, setquizData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    const { course_id } = useParams();

    useEffect(() => {
        //fetch courses
        try{
            axios.get(baseURL +'/fetch-assigned-quiz/'+course_id)
            .then((res) => {
                setquizData(res.data);
            })
        }catch (error) {
            console.log(error);
        }
        document.title = 'Quiz List';
    }, []);
  return (
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Quiz List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Quiz</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               {quizData.map((row, index)=>
                                <tr>
                                    <td>
                                        <div style={{ textAlign: 'center' }}>
                                        <div
                                            className="btn btn-light btn-md active" 
                                            style={{ width: '50%', }} >
                                            <div style={{ textDecoration: 'none',color: 'black', fontWeight: 'bold' 
                                            }}> {row.quiz.title}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    <CheckQuizStatusForStudents quiz={row.quiz.id} student={studentId}/>
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
  )
}

export default CourseQuizList
