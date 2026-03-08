import { useEffect, useState } from "react";
import api from "../services/api";

function UnitList() {
  const [units, setUnits] = useState([]);

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

  return (
    <div className="card">
      <h3>Unit List</h3>

      {units.length === 0 ? (
        <p className="small-text">No units created yet.</p>
      ) : (
        units.map((unit) => (
          <div key={unit._id} className="list-item">
            <p>
              <strong>{unit.unitName}</strong> - {unit.termName}
            </p>
            <p className="small-text">
              Start Date: {new Date(unit.startDate).toLocaleDateString()}
            </p>
            <p className="small-text">
              End Date: {unit.endDate ? new Date(unit.endDate).toLocaleDateString() : "Not ended yet"}
            </p>
            <p className="small-text">Notes: {unit.notes || "No notes added"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UnitList;