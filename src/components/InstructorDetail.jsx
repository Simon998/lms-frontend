import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';

function InstructorDetail(){
    const [courseData, setcourseData] = useState([]);
    const [teacherData, setteacherData] = useState([])
    const [skillList, setskillList] = useState([])
    const {instructor_id} = useParams();
   


    useEffect(() => {
        try {
            axios.get(baseURL +'/teacher/'+instructor_id+ '/')
                .then((res)=>{
                    console.log(res);
                    setteacherData(res.data);
                    setcourseData(res.data.teacher_courses);
                    setskillList(res.data.skill_list);
                    
        });
        }catch (error) {
            console.log(error);
        }
        
    },[]);

    return(
        <div className="container mt-3">
    <div className="row">
        <div className="col-4">
        <img src={teacherData.profile_img} className="img-thumbnail" style={{ height: '300px' , borderRadius: '30px' }} alt="instructorimage" />
        </div>
        <div className="card bg-secondary text-white col-8">
            <div className="card-header" style={{textAlign: 'center'}} >{teacherData.full_name}</div>
            <div className="card-body">
                <p className="card-text">
                    
                    <p>
                    {teacherData.detail}
                    </p>
                </p>
                <p className="card-text fw-bold">Skills:&nbsp;
                {skillList.map((skill, index)=>
                    <>
                    <Link to={`/instructor-skill-courses/${skill.trim()}/${teacherData.id}`} className='badge badge-pill text-dark bg-warning' style={{textDecoration: 'none'}}>{skill.trim()}</Link>&nbsp;
                    </>
                )}
                </p>
                <p className="card-text fw-bold">
                    Recent Course: <Link to="/category/php" style={{ textDecoration: 'none',color: 'black'}}>React Js</Link>
                </p>
                
                <p className='fw-bold'>Rating:<span style={{ color: 'gold'}}> 4.5/5</span></p>

            </div>
        </div>
        </div>
        {/*course videos */}
        <div className="card mt-4 col-12">
        
            <h5 className="card-header">
              Course List
            </h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course, index) => 
                    <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action"style={{boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",backgroundColor: "#f4f4f4"
                    }}>
                    {course.title}
                    </Link>
                    )}
                </div>
        
        </div>   
    </div>
    );
}
export default InstructorDetail;