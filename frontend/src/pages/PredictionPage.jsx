import PredictionCard from "../components/PredictionCard";

function PredictionPage() {
  return (
    <div className="container form-page">
      <div className="card">
        <h2 className="section-title">AI Prediction</h2>
        <p className="small-text">
          Generate predicted academic performance using attendance, unit marks, term test marks, homework completion, and behavior score.
        </p>
      </div>

      <PredictionCard />
    </div>
  );
}

export default PredictionPage;