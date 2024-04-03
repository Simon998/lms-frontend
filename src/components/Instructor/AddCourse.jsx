import { Link } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL='http://127.0.0.1:8000/api';
function AddCourse(){

    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        f_img: '',
        techs: ''
    });
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
        
    },[]);

    
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
    const teacherId = localStorage.getItem('teacherId')
    const _formData = new FormData();
    
    
    _formData.append('category', courseData.category);
    _formData.append('teacher',teacherId);
    _formData.append('title', courseData.title);
    _formData.append('description', courseData.description);
    _formData.append('featured_img', courseData.f_img,courseData.f_img.name);
    _formData.append('techs', courseData.techs);

    try{
        axios.post(baseURL+'/course/', _formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=> {
            //console.log(res.data);
            window.location.href = '/add-course';
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
                    <h5 className="card-header">Add Course</h5>
                    <div className="card-body">
                        <form onSubmit={formsubmit}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Category</label>
                                <select name="category" onChange={handleChange} className="form-control">
                                    {cats.map ((category, index) => {return <option key={index} value={category.id}>{category.title}</option>})}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input onChange={handleChange} type="text" id="title" name="title" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="video" className="form-label">Featured Image</label>
                                <input type="file" onChange={handleFileChange} name="f_img" className="form-control"></input>
                            </div>
                            <div className="mb-3">
                                <label for="vtechnologies" className="form-label">Technologies</label>
                                <textarea onChange={handleChange} name="technologies" placeholder="Php, Python, Data Science...." className="form-control"></textarea>
                            </div>
                            <button onClick={formsubmit} className="btn btn-primary">Add Course</button>
                        </form>
                    </div>
                </div>
                  
                </div>
            </div>
        </div>
    );
}

export default AddCourse;