import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';

function CheckQuizStatusForStudents(props){

    const [quizData, setquizData] = useState({});
    const studentId= localStorage.getItem('studentId')

    //fetch quiz assign status
    useEffect(() => {
        try {
            axios.get(`${baseURL}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((res)=>{
                setquizData(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
        {quizData.bool === true &&
         <span style={{ color: 'green', textDecoration: 'none' }}>You have already attempted this quiz!</span>
            
        }
       {quizData.bool === false &&
           <Link to={`/attempt-quiz/${props.quiz}`}className="btn btn-warning btn-smd ms-2">Take Quiz</Link>
        }
        </div>
    );
}

export default CheckQuizStatusForStudents;