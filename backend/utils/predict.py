# backend/utils/predict.py
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from . import MODEL_PATH

# Load model once at import time
model = load_model(MODEL_PATH)

def preprocess_image(file, target_size=(224, 224)):
    """
    Convert uploaded file into a format suitable for model prediction.
    """
    img = image.load_img(file, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

def predict(file):
    """
    Run model prediction on uploaded file.
    Returns: dict with label + probability
    """
    img_array = preprocess_image(file)
    preds = model.predict(img_array)[0][0]  # assume binary classification

    probability = float(preds)
    label = "Melanoma" if probability >= 0.5 else "Non-Melanoma"

    return {
        "label": label,
        "probability": probability
    }
