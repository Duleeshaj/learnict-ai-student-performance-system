import { useEffect, useState } from "react";
import api from "../services/api";
import AttendanceForm from "../components/AttendanceForm";
import QRScannerAttendance from "../components/QRScannerAttendance";

function AttendancePage() {
  const [units, setUnits] = useState([]);
  const [showManualForm, setShowManualForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const [scanDetails, setScanDetails] = useState({
    unitId: "",
    attendanceDate: "",
  });

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await api.get("/units");
      setUnits(res.data);
    } catch (error) {
      console.error("Failed to fetch units");
    }
  };

  const handleOpenScanner = () => {
    if (!scanDetails.unitId || !scanDetails.attendanceDate) {
      alert("Please select the unit and attendance date first.");
      return;
    }

    setShowScanner(true);
  };

  return (
    <div className="container form-page">
      <div className="card">
        <h2 className="section-title">Unit Attendance</h2>
        <p className="small-text">
          Record attendance for each student under a selected academic unit and date.
        </p>
      </div>

      <div className="card">
        <h3>QR Attendance Setup</h3>
        <p className="small-text">
          Select the unit and date first, then click the scan button.
        </p>

        <select
          value={scanDetails.unitId}
          onChange={(e) =>
            setScanDetails({
              ...scanDetails,
              unitId: e.target.value,
            })
          }
        >
          <option value="">Select Unit</option>
          {units.map((unit) => (
            <option key={unit._id} value={unit._id}>
              {unit.unitName} - {unit.termName}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={scanDetails.attendanceDate}
          onChange={(e) =>
            setScanDetails({
              ...scanDetails,
              attendanceDate: e.target.value,
            })
          }
        />

        <button
          type="button"
          onClick={handleOpenScanner}
          style={{ marginTop: "10px" }}
        >
          Scan QR
        </button>
      </div>

      {showScanner && (
        <QRScannerAttendance
          unitId={scanDetails.unitId}
          attendanceDate={scanDetails.attendanceDate}
          onClose={() => setShowScanner(false)}
        />
      )}

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "6px" }}>Manual Attendance</h3>
            <p className="small-text" style={{ marginBottom: 0 }}>
              Use this form only when QR scanning is not possible.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowManualForm(!showManualForm)}
            style={{ width: "auto", minWidth: "180px" }}
          >
            {showManualForm ? "Hide Manual Form" : "Show Manual Form"}
          </button>
        </div>
      </div>

      {showManualForm && <AttendanceForm />}
    </div>
  );
}

export default AttendancePage;