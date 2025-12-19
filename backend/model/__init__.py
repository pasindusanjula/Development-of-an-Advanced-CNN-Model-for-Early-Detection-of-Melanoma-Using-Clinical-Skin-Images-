# backend/model/__init__.py
# This file makes the `model` folder a Python package.
# Nothing else needed unless you want lazy model loading here.

from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent / "melanoma_model.h5"
