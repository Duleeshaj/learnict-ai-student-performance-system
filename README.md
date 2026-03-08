# 📊 LearnICT AI Student Performance System

An **AI-Based Student Academic Performance Prediction System** developed for **LearnICT Foundation** using **Web-Based Learning Analytics**.

This system helps teachers **digitize student records, track attendance, analyze academic performance, and predict future exam results using machine learning models.**

---

# 🏫 About LearnICT Foundation

**LearnICT Foundation** is an educational initiative focused on providing **ICT education for O/L and A/L students** through structured classroom teaching.

Classes are conducted in a **modern computer lab environment** under the guidance of **Mr. Rashitha Rathanayake**, an experienced ICT instructor.

### Current Teaching Workflow

The teaching environment focuses on:

- Small class sizes (maximum **30 students**)  
- Individual attention to each student  
- Continuous monitoring of academic progress  
- Regular **parent meetings** to discuss performance

However, student data such as:

- Attendance  
- Unit test marks  
- Sir's term test marks  
- School term test marks  
- Student performance observations  

were previously maintained **manually in notebooks or memory**, which can lead to:

❌ Missing records  
❌ Human errors  
❌ Difficulty analyzing performance trends  

---

# 🎯 Project Objective

This system was developed to **digitize and automate the academic monitoring process**.

The platform provides a **centralized teacher-aid system** that enables:

✔ Student profile management  
✔ QR-based attendance recording  
✔ Unit-based academic tracking  
✔ AI-based performance prediction  
✔ Learning analytics visualization  

---

# 🚀 Key Features

| Feature | Description |
|------|-------------|
| 👨‍🎓 Student Management | Store and manage student profiles with unique IDs |
| 📱 QR Attendance | Record attendance using QR scanning |
| 📚 Unit Management | Dynamic unit creation for each academic term |
| 📝 Marks Recording | Record unit tests, teacher tests, and school tests |
| 📈 Performance Analytics | Visualize student progress using charts |
| 🤖 AI Prediction | Predict final exam grade and risk level |
| ⚠️ Risk Analysis | Identify students at academic risk |
| 📊 Learning Analytics | Convert academic data into predictive insights |

---

# 🧠 AI Prediction Output

The system predicts possible exam outcomes such as:

| Predicted Grade |
|----------------|
| A Pass |
| B Pass |
| C Pass |
| S Pass |
| W (Fail) |

Prediction is based on:

- Attendance Percentage
- Average Unit Marks
- Sir's Term Test Marks
- School Term Test Marks
- Homework Completion Rate *(optional)*
- Behavior Score *(optional)*

---

# 🏗 System Architecture

Frontend (React)
│
├── Student Management
├── Attendance (QR)
├── Performance Analytics
└── Prediction Dashboard

Backend (Node.js + Express)
│
├── API Routes
├── Data Processing
└── AI Integration

Database (MongoDB)
│
├── Students
├── Units
├── Attendance
├── Marks
└── Performance Records

Machine Learning (Python)
│
├── Data Preprocessing
├── Model Training
├── Model Evaluation
└── Prediction API (Flask)

---

# 🛠 Tech Stack

| Layer | Technology |
|------|-------------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Machine Learning | Python |
| ML Environment | Jupyter Notebook |
| AI API | Flask |
| Data Visualization | Recharts |
| Version Control | Git + GitHub |
| Browser | Google Chrome |

---

# 📂 Project Structure

learnict-ai-student-performance-system
│
├── frontend
│ ├── components
│ ├── pages
│ ├── services
│ └── styles
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ └── server.js
│
├── ml-model
│ ├── notebooks
│ ├── trained-model
│ └── api
│
├── dataset
│ └── student-performance-dataset.csv
│
└── README.md

---

# ⚙️ Installation Guide

### 1️⃣ Clone the Repository
git clone https://github.com/Duleeshaj/learnict-ai-student-performance-system.git

---

### 2️⃣ Install Frontend

cd frontend
npm install
npm run dev

---

### 3️⃣ Install Backend

cd backend
npm install
node server.js

---

### 4️⃣ Run ML Prediction API

cd ml-model/api
python app.py

---

# 📊 Machine Learning Models Used

The system trains and compares multiple models to select the best performer.

| Model | Purpose |
|------|---------|
| Logistic Regression | Baseline classification |
| Decision Tree | Rule-based prediction |
| Random Forest | Ensemble learning |
| Neural Network (MLP) | Deep pattern learning |

The **best performing model** is used for the final prediction API.

---

# 📈 Learning Analytics Dashboard

The system provides **visual insights** into student progress:

✔ Attendance trends  
✔ Unit test performance  
✔ Term exam comparison  
✔ Historical academic performance  

This helps teachers quickly understand **student learning behavior**.

---

# 🎓 Academic Value

This project demonstrates the integration of:

- **Learning Analytics**
- **Artificial Intelligence**
- **Educational Data Mining**
- **Web Application Development**

to support **data-driven teaching decisions**.

---

# 🔮 Future Enhancements

| Feature | Description |
|-------|-------------|
| Parent Portal | Allow parents to view student performance |
| Fee Management | Track student fee payments |
| Mobile App | Android/iOS version |
| Notification System | Automated alerts for low performance |
| Advanced ML Models | Deep learning improvements |

---

# 👨‍💻 Developed By

**Duleesha Jayasinghe**

Final Year Project  
AI-Based Student Performance Prediction System

---

# 📜 License

This project is developed for **academic and educational purposes**.

---

⭐ If you find this project useful, feel free to star the repository!
