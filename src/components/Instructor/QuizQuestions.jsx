import React from 'react'
import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';

function QuizQuestions() {
    const [questionData, setquestionData] = useState([]);

    const [totalResult, settotalResult] = useState(0);

    const {quiz_id} = useParams();
     //fetch quizs
     useEffect(() => {
        try {
            axios.get(baseURL +'/quiz-questions/'+quiz_id)
            .then((res)=>{
                settotalResult(res.data.length);
                setquestionData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
        
    },[]);

   
    const handleDeleteClick = (question_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this question?',
            icon: 'warning',
            confirmButtonText: 'continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseURL + '/question/' + question_id)
                        .then((res) => {
                            Swal.fire('Success!', 'question has been deleted.' );
                            try{
                                axios.get(baseURL +'/quiz-questions/'+quiz_id)
                                .then((res)=>{
                                    settotalResult(res.data.length);
                                    setquestionData(res.data);
                                });
                            }catch (error) {
                                console.log(error);
                            }
                            
                        });
                    
                } catch (error) {
                    Swal.fire('Error', 'quiz has not been deleted.');
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
                        <h5 className="card-header">All Questions({totalResult}) <Link to={`/add-quiz-questions/`+quiz_id} className="btn btn-primary btn-sm float-end "><i class="bi bi-file-plus"></i>Add Question</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionData.map((row, index)=>
                                <tr>
                                <td >
                                    <div  style={{ textDecoration: 'none', color:'blue'}}>
                                    {row.questions}
                                    </div>
                                </td>
                                <td>
                                    <Link to={'/edit-question/'+row.id} className="btn btn-info btn-sm  "><i class="bi bi-pencil square"></i>Edit Question</Link>
                                    <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-3"><i class="bi bi-trash"></i>Delete</button>   
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

export default QuizQuestions
