import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';
function Quizes(){

    const [quizData, setquizData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {quiz_id} = useParams();

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
        
    },[]);

       
    const handleDeleteClick = (quiz_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this quiz?',
            icon: 'warning',
            confirmButtonText: 'continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseURL + '/quiz/' + quiz_id)
                        .then((res) => {
                            Swal.fire('Success!', 'Quiz has been deleted.' );
                            try{
                                axios.get(baseURL +'/teacher-quiz/'+teacherId)
                                .then((res)=>{
                                    settotalResult(res.data.length);
                                    setquizData(res.data);
                            });
                        }catch (error) {
                            console.log(error);
                        }
                           
                        });
                    
                } catch (error) {
                    Swal.fire('Error', 'Quiz has not been deleted.');
                }
            } else {
                Swal.fire('error', 'data has not been deleted.');
            }
        });
    };

    

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Quiz</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Total Questions</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row, index)=>
                                <tr>
                                <td >
                                    <Link to={'/all-questions/'+ row.id} >
                                    <button style={{ backgroundColor: 'grey', textDecoration: 'none', color: 'black', border: 'none', padding: '5px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>{row.title}</button>
                                    </Link>
                                </td>
                                <td >
                                <div style={{ textDecoration: 'none', justifyContent:'center'}}>
                                    <button style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',width: '100%'  }}>{row.description}</button>
                                </div>
                                </td>
                                <td >
                                <Link to="#" style={{ textDecoration: 'none', justifyContent:'center'}}>
                                    <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',width: '100%'  }}>123</button>
                                </Link>
                                </td>
                                <td>
                                    <Link to={`/edit-quiz/`+ row.id}>
                                    <button className="btn btn-info btn-sm ms-3  ">Edit</button>
                                    </Link>
                                    <Link to={`/add-quiz-questions/`+row.id} >
                                    <button className="btn btn-primary btn-sm ms-3 ">Add Question</button>
                                    </Link>
                                    <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-3">Delete</button>
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

export default Quizes;