const axios = require("axios");

// send data to Flask API and return prediction
const predictStudentPerformance = async (req, res) => {
  try {
    const {
      attendance_percentage,
      avg_unit_marks,
      sir_term_test_avg,
      school_term_test_avg,
      homework_completion_rate,
      behavior_score
    } = req.body;

    const response = await axios.post(process.env.FLASK_API_URL, {
      attendance_percentage,
      avg_unit_marks,
      sir_term_test_avg,
      school_term_test_avg,
      homework_completion_rate,
      behavior_score
    });

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get prediction",
      error: error.message
    });
  }
};

module.exports = {
  predictStudentPerformance
};