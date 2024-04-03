
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const baseURL='http://127.0.0.1:8000/api';
function EditCourse(){

    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        prev_img:'',
        f_img: '',
        techs: ''
    });
    const teacherId = localStorage.getItem('teacherId')
    const { course_id } = useParams();
    //fetch categories when page loads
    useEffect(() => {
        try {
            axios.get(baseURL +'/category/')
            .then((res)=>{
                setCats(res.data);
        })
        }catch (error) {
            console.log(error);
        }
        //fetc course data
        try {
            axios.get(baseURL + '/teacher-course-detail/' + course_id)
                .then((res) => {
                    setCourseData({
                        category: res.data.category,
                        title: res.data.title,
                        description: res.data.description,
                        prev_img: res.data.featured_image,
                        f_img: '',
                        techs: res.data.techs,
                    });
                });
        } catch (error) {
            console.log(error);
        }
        
    },[]);

    useEffect(() => {
        document.title="Edit Course";
    });
    // change element input value
   const handleChange = (event) => {
    setCourseData({
        ...courseData,
        [event.target.name]: event.target.value
    });
    }

   const handleFileChange = (event) => {
    setCourseData({
        ...courseData,
        [event.target.name]: event.target.files[0]
    });
    }

    // submit form
    const formsubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const _formData = new FormData();
    
    
    _formData.append('category', courseData.category);
    _formData.append('teacher', teacherId);
    _formData.append('title', courseData.title);
    _formData.append('description', courseData.description);
    if (courseData.f_img!==''){
        _formData.append('featured_img', courseData.f_img,courseData.f_img.name);
    }
    
    
    _formData.append('techs', courseData.techs);

    try{
        axios.put(baseURL+'/teacher-course-detail/' + course_id, _formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=> {
            if(res.status=200){
                Swal.fire({
                    title: 'Course has been updated',
                
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: false
                    
            })
             
        
        }
        });
    }catch (error) {
        console.log(error);
        }

    };
    

    useEffect(() => {
        document.title="Add Course";
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
                    <h5 className="card-header">Edit Course</h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Category</label>
                                <select name="category" value={courseData.category} onChange={handleChange} className="form-control">
                                    {cats.map ((category, index) => {return <option key={index} value={category.id}>{category.title}</option>})}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input  value={courseData.title} onChange={handleChange} type="text" id="title" name="title" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea  value={courseData.description} onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="video" className="form-label">Featured Image</label>
                                <input type="file"   onChange={handleFileChange} name="f_img" className="form-control"></input>
                                {courseData.prev_img &&
                               
                                <img src={courseData.prev_img} width="250" className="mt-2"  style={{ borderRadius: '10px' }} />
                               
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="technologies" className="form-label">Technologies</label>
                                <textarea value={courseData.techs} onChange={handleChange} name="techs" placeholder="Php, Python, Data Science...." className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-success">Save Changes</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default EditCourse;