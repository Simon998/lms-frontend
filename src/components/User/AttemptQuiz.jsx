import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api';
function AttemptQuiz() {
    const studentId = localStorage.getItem('studentId');
    const [questionData, setquestionData] = useState([]);

    const {quiz_id} = useParams();

    useEffect(() => {
        //fetch quizs
        try {
            axios.get(baseURL +'/quiz-questions/'+quiz_id+'/1')
            .then((res)=>{
                setquestionData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
    }, []);

    const submitAnswer = (question_id,correct_ans) => {

    const _formData = new FormData();
    
    _formData.append('student', studentId);
    _formData.append('quiz', quiz_id);
    _formData.append('question', question_id);
    _formData.append('correct_ans', correct_ans);

    try{
        axios.post(baseURL + '/attempt-quiz/' , _formData)
        .then((res)=> {
            if(res.status===200||res.status===201){
                try {
                    axios.get(baseURL +'/quiz-questions/'+quiz_id+'/next-question/'+question_id)
                    .then((res)=>{
                        setquestionData(res.data);
                })
                }catch (error) {
                    console.log(error);
                }

        }
        });
    }catch (error) {
        console.log(error);
        }
    }

  return (
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                    <h4 className='mb-3 border-bottom'>Quiz Title</h4>
                    {questionData.map((row, index)=>
                    <div className="card mt-2">
                        <h5 className="card-header">{row.questions}</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <tbody>
                           
                            <>
                                <tr>
                                    <td><button className='btn btn-outline-primary'  style={{width: '80%',textAlign: 'left'}}  onClick={()=>submitAnswer(row.id,row.ans1)}>1. {row.ans1}</button></td>
                                    
                                </tr>
                                <tr>
                                    <td><button className='btn btn-outline-primary' style={{width: '80%',textAlign: 'left'}} onClick={()=>submitAnswer(row.id,row.ans2)} >2. {row.ans2}</button></td>
                                    
                                </tr>
                                <tr>
                                    <td><button className='btn btn-outline-primary'  style={{width: '80%',textAlign: 'left'}} onClick={()=>submitAnswer(row.id,row.ans3)}>3. {row.ans3}</button></td>
                                    
                                </tr>
                                <tr>
                                    <td><button className='btn btn-outline-primary'  style={{width: '80%',textAlign: 'left'}} onClick={()=>submitAnswer(row.id,row.ans4)} >4. {row.ans4}</button></td>
                                    
                                </tr>
                                </>
                                
                            </tbody>
                        </table>
                       
                        </div>
                    </div>
                    )}
                    {questionData.length === 0 && (
                        <div className="card mt-2">
                            <h5 className="card-header">No Questions</h5>
                            <div className="card-body">
                                <h3>No questions added!</h3>
                                <Link to='/user-dashboard' className='btn btn-success'>Back to Dashboard</Link>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
  )
}

export default AttemptQuiz
