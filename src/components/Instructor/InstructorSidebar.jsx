import { Link } from "react-router-dom";

function InstructorSidebar(){
    return(
            <div class="card">
                <h5 className="card-header">Dashboard</h5>
                    <div className="list-group list-group-flush">
                        <Link to="/instructor-dashboard" className="list-group-item list-group-item-action bg-warning" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Dashboard</Link>
                        <Link to="/instructor-courses" className="list-group-item list-group-item-action bg-secondary" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>My Courses</Link>
                        <Link to="/add-course" className="list-group-item list-group-item-action bg-secondary" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Add Course</Link>
                        <Link to="/instructor-users" className="list-group-item list-group-item-action bg-secondary" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>My Users</Link>
                        <Link to="/quiz" className="list-group-item list-group-item-action bg-secondary " style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Quiz</Link>
                        <Link to="/add-quiz" className="list-group-item list-group-item-action bg-secondary" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Add Quiz</Link>
                        <Link to="/instructor-profile-setting" className="list-group-item list-group-item-action bg-secondary" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Profile Setting</Link>
                        <Link to="/instructor-change-password" className="list-group-item list-group-item-action bg-secondary" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Change Password</Link>
                        <Link to="/instructor-login" className="list-group-item list-group-item-action text-dark bg-danger" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Logout<i class="bi bi-box-arrow-in-right"></i></Link>
                    </div>
            </div>

            );
}

export default  InstructorSidebar;