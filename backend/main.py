from fastapi import FastAPI
from model import predict_emotion
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Emotion Prediction API Running"}

@app.post("/predict")
def predict(heart_rate: int, age: int):
    emotion, confidence = predict_emotion(heart_rate, age)

    return {
        "heart_rate": heart_rate,
        "age": age,
        "predicted_emotion": emotion,
        "confidence": confidence
    }