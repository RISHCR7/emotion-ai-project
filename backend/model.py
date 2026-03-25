import pickle
import pandas as pd

model = pickle.load(open("model.pkl", "rb"))

def predict_emotion(heart_rate, age):
    input_data = pd.DataFrame([[heart_rate, age]], columns=['Heart Rate', 'Age'])
    
    prediction = model.predict(input_data)[0]
    probabilities = model.predict_proba(input_data)[0]

    confidence = max(probabilities)

    return prediction, float(confidence)