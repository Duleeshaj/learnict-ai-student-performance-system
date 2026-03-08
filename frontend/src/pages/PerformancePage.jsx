import PerformanceAnalytics from "../components/PerformanceAnalytics";

function PerformancePage() {
  return (
    <div className="container list-page">
      <div className="card">
        <h2 className="section-title">Performance Analytics</h2>
        <p className="small-text">
          Compare current student performance with previously recorded academic results using charts and summary analytics.
        </p>
      </div>

      <PerformanceAnalytics />
    </div>
  );
}

export default PerformancePage;