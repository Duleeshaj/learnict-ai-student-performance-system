import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function StudentsPage() {
  return (
    <div className="container list-page">
      <div className="card">
        <h2 className="section-title">Student Management</h2>
        <p className="small-text">
          Add student records and review existing student profiles with generated QR values.
        </p>
      </div>

      <div className="grid two-col">
        <StudentForm />
        <StudentList />
      </div>
    </div>
  );
}

export default StudentsPage;