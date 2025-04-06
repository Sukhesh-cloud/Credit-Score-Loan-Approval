from fastapi import FastAPI, Request
from pydantic import BaseModel
import joblib
import shap
import numpy as np
import os
from dotenv import load_dotenv


app = FastAPI()

# Load ML model
model = joblib.load("credit_model.pkl")
explainer = shap.Explainer(model.predict, np.array([[0, 0, 0]]))

# Input model
class UserData(BaseModel):
    income: float
    history_score: float
    utility_bills_paid: int

@app.post("/predict")
def predict_score(user: UserData):
    data = [[user.income, user.history_score, user.utility_bills_paid]]
    score = model.predict(data)[0]
    shap_values = explainer(np.array(data))[0].values.tolist()

    return {
        "credit_score": round(score, 2),
        "shap_values": shap_values,
        "features": ["income", "history_score", "utility_bills_paid"]
    }

