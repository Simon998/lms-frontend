import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL='http://127.0.0.1:8000/api';
function MyCourses(){

    const [courseData, setCourseData] = useState([]);

    const teacherId = localStorage.getItem('teacherId')
    //console.log (teacherId);

     //fetch courses
     useEffect(() => {
        try {
            axios.get(baseURL +'/teacher-courses/'+teacherId)
            .then((res)=>{
                setCourseData(res.data);
        })
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
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Total Enrolled:</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((course, index)=>
                                <tr>
                                <td >
                                    <Link to={'/all-chapters/'+ course.id} >
                                    <button style={{ backgroundColor: 'grey', textDecoration: 'none', color: 'black', border: 'none', padding: '5px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>{course.title}</button>
                                    </Link>
                                    <hr/>
                                    {course.course_rating && 
                                        <span>Rating: {course.course_rating}/5</span>
                                    }
                                    {!course.course_rating && 
                                         <span>Rating: 0/5</span>
                                    }
                                </td>
                                <td >
                                <img src={course.featured_image} width="80" className="rounded" alt={course.title}/>
                                </td>
                                <td >
                                <Link to={`/enrolled-students/`+ course.id} style={{ textDecoration: 'none', justifyContent:'center'}}>
                                    <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',width: '100%'  }}>{course.total_enrolled_students}</button>
                                </Link>
                                </td>
                                <td>
                                    <Link to={`/edit-course/` + course.id}>
                                        <button className="btn btn-info btn-sm ms-3 mt-2" >Edit</button>
                                    </Link>
                                    <Link to={`/add-chapter/` + course.id}>
                                        <button className="btn btn-primary btn-sm ms-3 mt-2" >Add Chapter</button>
                                    </Link>
                                    <Link to={`/study-material/` + course.id}>
                                        <button className="btn btn-success btn-sm ms-3 mt-2" >Study Materials</button>
                                    </Link>
                                    <Link to={`/assign-quiz/` + course.id}>
                                        <button className="btn btn-warning btn-sm ms-3 mt-2" >Assign Quiz</button>
                                    </Link>
                                    <button className="btn btn-danger btn-sm mr-3 mt-4 float-end" >Delete</button>
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

export default MyCourses;