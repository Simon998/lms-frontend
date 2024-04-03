import { Link } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2';


const baseURL='http://127.0.0.1:8000/api';
function AddQuizQuestions(){
    
    const [questionData, setquestionData] = useState({
        quiz: '',
        questions: '',
        ans1: '',
        ans2: '',
        ans3: '',
        ans4: '',
        correct_ans: ''
    });
   

    
    // change element input value
   const handleChange = (event) => {
    setquestionData({
        ...questionData,
        [event.target.name]: event.target.value
    });
    }

    const {quiz_id} = useParams();
    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    
    _formData.append('quiz', quiz_id);
    _formData.append('questions', questionData.questions);
    _formData.append('ans1', questionData.ans1);
    _formData.append('ans2', questionData.ans2);
    _formData.append('ans3', questionData.ans3);
    _formData.append('ans4', questionData.ans4);
    _formData.append('correct_ans', questionData.correct_ans);

    try{
        axios.post(baseURL + '/quiz-questions/' + quiz_id , _formData)
        .then((res)=> {
            if(res.status===201){
                Swal.fire({
                    title: 'question has been added successfully!',
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
        document.title="Add question";
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
                    <h5 className="card-header">Add question <Link to={`/all-questions/`+quiz_id} className="btn btn-danger btn-sm float-end "><i class="bi bi-file-plus"></i>View All Questions</Link></h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="questions" className="form-label">Question</label>
                                <textarea onChange={handleChange} type="text" id="questions" name="questions" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="ans1" className="form-label">Answer one</label>
                                <textarea onChange={handleChange} id="ans1" name="ans1" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="ans2" className="form-label">Answer two</label>
                                <textarea onChange={handleChange} id="ans2" name="ans2" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="ans3" className="form-label">Answer three</label>
                                <textarea onChange={handleChange} id="ans3" name="ans3" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="ans4" className="form-label">Answer four</label>
                                <textarea onChange={handleChange} id="v" name="ans4" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="correct_ans" className="form-label">Correct answer</label>
                                <textarea onChange={handleChange} id="correct_ans" name="correct_ans" className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-primary">Add question</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default AddQuizQuestions;