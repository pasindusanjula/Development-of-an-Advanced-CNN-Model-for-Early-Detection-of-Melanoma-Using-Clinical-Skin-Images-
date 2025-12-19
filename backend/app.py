import os
from io import BytesIO

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf

from utils.preprocessing import preprocess_image

# -----------------------
# Config
# -----------------------
MODEL_PATH = os.path.join("model", "melanoma_efficientnetb0_final.keras")
IMAGE_SIZE = (224, 224)
THRESHOLD = 0.48  # change to your tuned threshold if you have one

# -----------------------
# App init
# -----------------------
app = Flask(__name__)
CORS(app)

# Load model once on startup
print("Loading model from:", MODEL_PATH)
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded.")

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": bool(model is not None)}), 200

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "no file part 'image'"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "no file selected"}), 400

    try:
        img_bytes = file.read()
        image = Image.open(BytesIO(img_bytes)).convert("RGB")

        # Preprocess to match training (resizing, scaling)
        x = preprocess_image(image, target_size=IMAGE_SIZE)  # returns (1, h, w, 3)
        probs = model.predict(x)  # shape (1,1) or (1,)
        if probs.shape[-1] == 1:
            prob = float(probs.ravel()[0])
        else:
            # in case model outputs two classes, take class 1 prob
            prob = float(probs.ravel()[-1])

        label = "Melanoma" if prob >= THRESHOLD else "Non-Melanoma"
        confidence = prob if prob >= THRESHOLD else 1 - prob

        return jsonify({
            "prediction": label,
            "probability_raw": prob,
            "confidence": round(float(confidence), 4),
            "threshold": THRESHOLD
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
