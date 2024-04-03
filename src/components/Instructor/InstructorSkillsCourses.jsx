import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';
function InstructorSkillsCourses(){
    const [courseData, setcourseData] = useState([]);
    const {skill_name,teacher_id} = useParams();

    
    useEffect(() => {
        try {
            axios.get(baseURL +'/course/?skill_name='+skill_name+'&teacher='+teacher_id)
                .then((res)=>{
                    setcourseData(res.data);
        });
        }catch (error) {
            console.log(error);
        }
        
    },[]);

    return(
            <div className="container mt-3">
           {/*COURSES START */}
            <h3 className='pb-1 mb-4'style={{ textAlign:'center'}}>{skill_name}</h3>
            <div className='row mb-4'>
            {courseData && courseData.map((course, index)=> 
                <div className='col-md-3 mb-4' key={index}>
                    <Card className="h-150">
                        <div >
                            <Card.Img variant="top" src={course.featured_image} className="img-thumbnail" style={{ height: '200px' , borderRadius: '30px' }}/>
                        </div>
                        <Card.Body className="text-center d-flex flex-column">
                            <Card.Title>
                                <Link to={`/detail/${course.id}` } style={{ textDecoration: 'none', textAlign:"center" }}>{course.title}</Link>
                            </Card.Title>
                            <Button variant="secondary" className="mt-auto">
                                <Link to={`/detail/${course.id}` } style={{ textDecoration: 'none', color: "white"}}>Show Details</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                )}
            </div>
            {/*COURSES END */}
            {/* pagination */}
            <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
            </nav>
            {/*pagination end */}
        </div>
    );
}

export default  InstructorSkillsCourses;