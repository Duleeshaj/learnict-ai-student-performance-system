import { useEffect, useState } from "react";
import api from "../services/api";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students");
    }
  };

  const handleViewQR = async (studentId) => {
    try {
      const res = await api.get(`/students/${studentId}/qrcode`);
      setSelectedQR(res.data);
    } catch (error) {
      alert("Failed to load QR code");
    }
  };

  const handleDownloadQR = () => {
    if (!selectedQR?.qrImage) return;

    const link = document.createElement("a");
    link.href = selectedQR.qrImage;
    link.download = `${selectedQR.studentId}_qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeQRModal = () => {
    setSelectedQR(null);
  };

  return (
    <div className="card">
      <h3>Student List</h3>

      {students.length === 0 ? (
        <p className="small-text">No students added yet.</p>
      ) : (
        students.map((student) => (
          <div key={student._id} className="list-item">
            <p>
              <strong>{student.fullName}</strong> ({student.studentId})
            </p>
            <p className="small-text">
              School: {student.school || "Not provided"}
            </p>
            <p className="small-text">
              Grade Level: {student.gradeLevel || "Not provided"}
            </p>
            <p className="small-text">QR Value: {student.qrCodeValue}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <button type="button" onClick={() => handleViewQR(student._id)}>
                View QR
              </button>
            </div>
          </div>
        ))
      )}

      {selectedQR && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "420px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{selectedQR.fullName}</h3>
            <p className="small-text" style={{ marginBottom: "16px" }}>
              {selectedQR.studentId}
            </p>

            <img
              src={selectedQR.qrImage}
              alt="Student QR Code"
              style={{
                width: "220px",
                height: "220px",
                objectFit: "contain",
                marginBottom: "16px",
              }}
            />

            <p className="small-text" style={{ marginBottom: "18px" }}>
              {selectedQR.qrCodeValue}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button type="button" onClick={handleDownloadQR}>
                Download QR
              </button>

              <button type="button" onClick={closeQRModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;