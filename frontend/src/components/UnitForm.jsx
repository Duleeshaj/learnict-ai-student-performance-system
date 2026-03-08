import { useState } from "react";
import api from "../services/api";

function UnitForm() {
  const [formData, setFormData] = useState({
    unitName: "",
    termName: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/units", formData);
      alert("Unit created successfully");
      setFormData({
        unitName: "",
        termName: "",
        startDate: "",
        endDate: "",
        notes: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create unit");
    }
  };

  return (
    <div className="card">
      <h3>Create Unit</h3>
      <p className="small-text">Create a new academic unit under a selected term.</p>

      <form onSubmit={handleSubmit}>
        <input name="unitName" placeholder="Unit Name" value={formData.unitName} onChange={handleChange} />
        <input name="termName" placeholder="Term Name" value={formData.termName} onChange={handleChange} />
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
        <button type="submit">Save Unit</button>
      </form>
    </div>
  );
}

export default UnitForm;