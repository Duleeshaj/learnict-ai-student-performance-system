import UnitForm from "../components/UnitForm";
import UnitList from "../components/UnitList";

function UnitsPage() {
  return (
    <div className="container list-page">
      <div className="card">
        <h2 className="section-title">Unit Management</h2>
        <p className="small-text">
          Create academic units under each term and manage the teaching timeline in a structured way.
        </p>
      </div>

      <div className="grid two-col">
        <UnitForm />
        <UnitList />
      </div>
    </div>
  );
}

export default UnitsPage;