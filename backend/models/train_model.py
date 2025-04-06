# backend/models/train_model.py
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

df = pd.read_csv('sample_data.csv')

X = df[['income', 'history_score', 'utility_bills_paid']]
y = df['credit_score']

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, 'credit_model.pkl')
print("Model trained and saved.")
