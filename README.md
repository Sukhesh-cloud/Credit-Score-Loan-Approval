# AI-Powered Credit Scoring & Digital Lending Platform

An inclusive, intelligent platform to empower **women entrepreneurs** by enabling fair access to credit, transparent AI-based credit scoring, and interactive financial literacy tools.

---

## 🚀 Overview

Despite institutional efforts, women-owned businesses still face systemic barriers to accessing credit due to bias, lack of collateral, and limited financial literacy. This platform bridges that gap through:

- AI-powered credit score prediction with SHAP explainability  
- Personalized loan eligibility assessment  
- Gemini-powered financial literacy chatbot  
- Application tracking and admin approval workflow  
- Transparent, data-driven decision making  

---

## 🎯 Challenge Alignment

> **Goal:** Improve access to funding for women entrepreneurs via AI-based evaluation, inclusive credit solutions, and financial education.

| Feature | How It Helps |
|--------|--------------|
| 🔍 Credit Score with SHAP | Fair & transparent scoring removes systemic bias |
| 🏦 Tailored Loan Offers | Assesses loan eligibility & terms instantly |
| 📜 Prediction History | Track credit assessments over time |
| 🧠 Gemini Chatbot | Boosts financial literacy via AI Q&A |
| 🧾 Loan Applications | Apply & monitor credit requests |
| 🔐 Admin Dashboard | Manage approvals, promote equity |

---

## 🛠️ Tech Stack

| Layer | Tech |
|------|------|
| ⚙️ Backend (API) | Python (FastAPI), ML Model (joblib), SHAP |
| 🧠 AI Chatbot | Gemini API (Google Generative AI) |
| 🌐 Frontend | React.js |
| 📦 Server | Node.js (Express for auth & loan APIs) |
| 🛢️ Database | MySQL (Workbench) |
| 🔐 Auth | JWT-based Secure Login/Register |

---

## 📸 Key Features (Screenshots)

- Login & Register  
- Credit Score Prediction + SHAP Explainability  
- Loan Eligibility (EMI calculation included)  
- Prediction History & My Applications  
- Admin Approval Dashboard  
- Interactive Gemini Chatbot for literacy  

---

## 🔁 Workflow

1. **User registers/logs in**  
2. **Inputs credit details** (income, history score, bills)  
3. **ML model predicts score**, shows explainability (SHAP)  
4. **Loan offer generated** (based on thresholds)  
5. **User applies for loan**, stored in DB  
6. **Admin reviews and updates status**  
7. **Chatbot available for questions on credit, EMI, etc.**

---

## 📁 Folder Structure

```
credit-scoring-platform/
├── backend/
│   ├── api/               # Node.js Express routes (auth, loans)
│   ├── models/            # FastAPI credit scoring & Gemini chatbot
│   ├── config/            # DB config
│   └── .env               # API keys & secrets
├── frontend/
│   ├── src/
│   │   ├── pages/         # Home, Login, Register, History, etc.
│   │   ├── components/    # ScoreCard, Chatbot, ShapChart, etc.
│   │   └── App.js         # Route setup
│   └── .env
└── README.md
```

---

## ⚙️ How to Run

### 1️⃣ Backend (Node.js + FastAPI)

```bash
# In backend/
cd backend
npm install
# Setup MySQL in config/db.js
node api/app.js  # Starts Node server (port 5000)

# In another terminal for FastAPI ML server
cd models
uvicorn credit_model:app --reload  # (port 8000)
```

### 2️⃣ Frontend (React)

```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

---

## 🔐 Environment Setup (.env files)

### backend/.env

```env
JWT_SECRET=your_jwt_secret
```

### frontend/src/pages/Chatbot.js

```
YOUR_API_KEY=your_gemini_or_openai_key
```

---

## 📊 Model Info

- **Model**: Trained regression model using features:
  - `income`, `history_score`, `utility_bills_paid`
- **Explainability**: SHAP (SHapley Additive exPlanations)
- **Output**: `credit_score`, `shap_values[]`, `loan_eligibility`

---

## 📌 Future Enhancements

- 📚 Add interactive “Learn” dashboard for literacy modules  
- ⚖️ Add fairness & bias detection metrics for model auditing  
- 🤝 Peer-to-peer or community lending options  
- 🌍 Multilingual support for diverse access  

---

## 👩‍💻 Team Code_Crafters

Crafting equitable AI tools for inclusive credit access 🚀

> ✨ _Empowering women, one credit decision at a time._
