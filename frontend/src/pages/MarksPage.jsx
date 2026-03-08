import MarksEntryForm from "../components/MarksEntryForm";

function MarksPage() {
  return (
    <div className="container form-page">
      <div className="card">
        <h2 className="section-title">Marks Entry</h2>
        <p className="small-text">
          Enter unit test marks, Sir&apos;s term test marks, and school term test marks using one form.
        </p>
      </div>

      <MarksEntryForm />
    </div>
  );
}

export default MarksPage;