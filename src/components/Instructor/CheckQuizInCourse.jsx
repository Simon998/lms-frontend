import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';

function CheckQuizInCourse(props){

    const [quizData, setQuizData] = useState({});
    const teacherId = localStorage.getItem('teacherId');

    //fetch quiz assign status
    useEffect(() => {
        try {
            axios.get(`${baseURL}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res)=>{
                setQuizData(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    

    //assign quiz to course
    const assignQuiz = (quiz_id) => {
        const formData = new FormData();
        formData.append('teacher', teacherId);
        formData.append('course', props.course);
        formData.append('quiz', props.quiz);
        
        try {
            axios.post(baseURL+'/quiz-assign-course/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                if(res.status === 200 || res.status === 201){
                    Swal.fire({
                        title: 'Quiz added to course successfully!',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: 'false'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {quizData.bool == false &&
                <button onClick={() => assignQuiz(props.quiz)} className="btn btn-success btn-sm ms-2">Assign Quiz</button>
            }
           {quizData.bool == true &&
                <>
                <span style={{ color: 'green', textDecoration: 'none' }}>Quiz Assigned</span>
                <Link to={`/attempted-students/`+ props.quiz} className="btn btn-primary btn-md float-end" >Attempted Students
                </Link>
                </>
            }
        </div>
    );
}

export default CheckQuizInCourse;
