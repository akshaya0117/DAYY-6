import { useState } from "react";
import "./App.css";

function StudentCard({ id, name, course, onDelete }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Course: {course}</p>
      <button className="delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const addStudent = () => {
    if (!name.trim() || !course.trim()) return;
    const newStudent = { id: Date.now(), name, course };
    setStudents((prev) => [...prev, newStudent]);
    setName("");
    setCourse("");
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => setStudents([]);

  return (
    <div className="app">
      <h1>📚 Student Directory</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="stats">
        <p>Total Students: {students.length}</p>
        {students.length > 0 && (
          <button className="delete" onClick={clearAll}>Clear All</button>
        )}
      </div>

      <div className="list">
        {students.length === 0 ? (
          <p>No students yet. Add some above 👆</p>
        ) : (
          students.map((s) => (
            <StudentCard
              key={s.id}
              id={s.id}
              name={s.name}
              course={s.course}
              onDelete={deleteStudent}
            />
          ))
        )}
      </div>
    </div>
  );
}
