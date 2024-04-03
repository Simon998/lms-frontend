import CustomNavbar from './CustomNavbar'
import Home from './Home'
import Footer from './Footer'
import About from './About'
import CourseDetail from './CourseDetail';
import InstructorDetail from './InstructorDetail';
import Search from './Search';
import Category from './Category';
import ContactUs from './ContactUs';

//user
import Login from './User/Login';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';
import Logout from './User/Logout';
import UserAssignment from './User/UserAssignment';
import CourseQuizList from './User/CourseQuizList';
import AttemptQuiz from './User/AttemptQuiz';
import UserStudyMaterial from './User/UserStudyMaterial';
//instructor
import InstructorLogin from './Instructor/InstructorLogin';
import InstructorRegister from './Instructor/InstructorRegister';
import InstructorDashboard from './Instructor/InstructorDashboard';
import InstructorCourses from './Instructor/InstructorCourses';
import InstructorProfileSetting from './Instructor/InstructorProfileSetting';
import InstructorChangePassword from './Instructor/InstructorChangePassword';
import AddCourse from './Instructor/AddCourse';
import UserList from './Instructor/UserList';
import InstructorLogout from './Instructor/InstructorLogout';
import AddChapter from './Instructor/AddChapter';
import CourseChapters from './Instructor/CourseChapters';
import EditChapter from './Instructor/EditChapter';
import EditCourse from './Instructor/EditCourse';
import InstructorSkillsCourses from './Instructor/InstructorSkillsCourses';
import EnrolledStudents from './Instructor/EnrolledStudents';
import AddAssignment from './Instructor/AddAssignment';
import ShowAssignment from './Instructor/ShowAssignment';
import AddQuiz from './Instructor/AddQuiz';
import Quizes from './Instructor/Quizes';
import EditQuiz from './Instructor/EditQuiz';
import AddQuizQuestions from './Instructor/AddQuizQuestions';
import QuizQuestions from './Instructor/QuizQuestions';
import AssignQuiz from './Instructor/AssignQuiz';
import StudyMaterial from './Instructor/StudyMaterial';
import AddStudyMaterial from './Instructor/AddStudyMaterial';
import AttemptedStudents from './Instructor/AttemptedStudents';
import InstructorForgotPassword from './Instructor/InstructorForgotPassword';

//List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularInstructors from './PopularInstructors';
import CategoryCourses from './CategoryCourses';
import FAQS from './FAQS';

import { Route,Routes as Switch } from 'react-router-dom'


function Main() {


  return (
    <div className="App">
      <CustomNavbar/>
      <Switch>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/detail/:course_id' element={<CourseDetail/>}/>
        <Route path='/user-login' element={<Login/>}/>
        <Route path='/user-register' element={<Register/>}/>
        <Route path='/user-dashboard' element={<Dashboard/>}/>
        <Route path="/my-courses" element={ <MyCourses/>}/>
        <Route path="/favorite-courses" element={ <FavoriteCourses/>}/>
        <Route path="/recommended-courses" element={ <RecommendedCourses/>}/>
        <Route path="/profile-setting" element={ <ProfileSetting/>}/>
        <Route path="/change-password" element={ <ChangePassword/>}/>
        <Route path="/user-logout" element={ <Logout/>}/>
        <Route path="/user/study-material/:course_id" element={ <UserStudyMaterial/>}/>

        <Route path="/instructor-login" element={ <InstructorLogin/>}/>
        <Route path="/instructor-logout" element={ <InstructorLogout/>}/>
        <Route path="/instructor-register" element={ <InstructorRegister/>}/>
        <Route path="/instructor-dashboard" element={ <InstructorDashboard/>}/>
        <Route path="/instructor-courses" element={ <InstructorCourses/>}/>
        <Route path="/instructor-profile-setting" element={ <InstructorProfileSetting/>}/>
        <Route path="/instructor-change-password" element={ <InstructorChangePassword/>}/>
        <Route path="/add-course" element={ <AddCourse/>}/>
        <Route path="/add-chapter/:course_id" element={ <AddChapter/>}/>
        <Route path="/edit-chapter/:chapter_id" element={ <EditChapter/>}/>
        <Route path="/edit-course/:course_id" element={ <EditCourse/>}/>
        <Route path="/all-chapters/:course_id" element={ <CourseChapters/>}/>
        <Route path="/instructor-users" element={ <UserList/>}/>
        <Route path="/instructor-detail/:instructor_id" element={ <InstructorDetail/>}/>
        <Route path="/popular-courses" element={ <PopularCourses/>}/>
        <Route path="/popular-instructors" element={ <PopularInstructors/>}/>
        <Route path="/all-courses" element={ <AllCourses/>}/>
        <Route path="/category" element={ <Category/>}/>
        <Route path="/course/:category_id/:category_slug" element={ <CategoryCourses/>}/>
        <Route path="/instructor-skill-courses/:skill_name/:teacher_id" element={ <InstructorSkillsCourses />}/>
        <Route path="/enrolled-students/:course_id" element={ <EnrolledStudents/>}/>
        <Route path="/add-assignment/:student_id/:teacher_id" element={ <AddAssignment/>}/>
        <Route path="/show-assignment/:student_id/:teacher_id" element={ <ShowAssignment/>}/>
        <Route path="/my-assignments" element={ <UserAssignment/>}/>
        <Route path="/add-quiz" element={ <AddQuiz/>}/>
        <Route path="/quiz" element={ <Quizes/>}/>
        <Route path="/edit-quiz/:quiz_id" element={ <EditQuiz/>}/>
        <Route path="/all-questions/:quiz_id" element={ <QuizQuestions/>}/>
        <Route path="/add-quiz-questions/:quiz_id" element={ <AddQuizQuestions/>}/>
        <Route path="/assign-quiz/:course_id" element={ <AssignQuiz/>}/>

        <Route path="/course-quiz/:course_id" element={ <CourseQuizList/>}/>
        <Route path="/attempt-quiz/:quiz_id" element={ <AttemptQuiz/>}/>
        <Route path="/attempted-students/:quiz_id" element={ <AttemptedStudents/>}/>

        <Route path='/search/:searchString' element={<Search/>}/>

        <Route path='/study-material/:course_id' element={<StudyMaterial/>}/>
        {/*<Route path="/edit-study/:study_id" element={ <EditStudy/>}/>*/}
        <Route path='/add-study-material/:course_id' element={<AddStudyMaterial/>}/>

        <Route path='/faqs' element={<FAQS/>}/>

        {/*Instructor Forgot Password*/}
        <Route path='/instructor-forgot-password' element={<InstructorForgotPassword/>}/>
       

      </Switch>
      <Footer/>
    </div>
  )
}

export default Main