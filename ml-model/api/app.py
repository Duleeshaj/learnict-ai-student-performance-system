from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# ==========================================================
# LOAD SAVED MODEL FILES
# ==========================================================

model = joblib.load("../saved_model/model.pkl")
scaler = joblib.load("../saved_model/scaler.pkl")
grade_encoder = joblib.load("../saved_model/grade_encoder.pkl")
trend_encoder = joblib.load("../saved_model/trend_encoder.pkl")


# ==========================================================
# RISK SCORE FUNCTIONS
# ==========================================================

def calculate_risk_score(attendance, unit_marks, sir_term, school_term, homework, behavior):
    weighted_score = (
        attendance * 0.20 +
        unit_marks * 0.20 +
        sir_term * 0.20 +
        school_term * 0.25 +
        homework * 0.10 +
        behavior * 0.05
    )

    risk_score = 100 - weighted_score
    return round(risk_score, 2)


def get_risk_level(score):
    if score <= 30:
        return "LOW"
    elif score <= 60:
        return "MEDIUM"
    else:
        return "HIGH"


def get_trend(unit_marks, school_term):
    if school_term > unit_marks:
        return "improving"
    elif school_term < unit_marks:
        return "declining"
    else:
        return "stable"


# ==========================================================
# ROUTES
# ==========================================================

@app.route("/")
def home():
    return jsonify({
        "message": "LearnICT AI Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        attendance = float(data["attendance_percentage"])
        avg_unit_marks = float(data["avg_unit_marks"])
        sir_term_test_avg = float(data["sir_term_test_avg"])
        school_term_test_avg = float(data["school_term_test_avg"])
        homework_completion_rate = float(data["homework_completion_rate"])
        behavior_score = float(data["behavior_score"])

        # Generate performance trend automatically
        performance_trend = get_trend(avg_unit_marks, school_term_test_avg)
        trend_encoded = trend_encoder.transform([performance_trend])[0]

        # Prepare input data for model
        input_data = np.array([[
            attendance,
            avg_unit_marks,
            sir_term_test_avg,
            school_term_test_avg,
            homework_completion_rate,
            behavior_score,
            trend_encoded
        ]])

        # Scale input
        input_scaled = scaler.transform(input_data)

        # Predict encoded class
        prediction = model.predict(input_scaled)[0]

        # Convert encoded prediction back to grade label
        predicted_grade = grade_encoder.inverse_transform([prediction])[0]

        # Calculate risk score and level
        risk_score = calculate_risk_score(
            attendance,
            avg_unit_marks,
            sir_term_test_avg,
            school_term_test_avg,
            homework_completion_rate,
            behavior_score
        )

        risk_level = get_risk_level(risk_score)

        return jsonify({
            "predicted_grade": predicted_grade,
            "performance_trend": performance_trend,
            "risk_score": risk_score,
            "risk_level": risk_level
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)