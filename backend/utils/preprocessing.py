import numpy as np
from PIL import Image

def preprocess_image(pil_img: Image.Image, target_size=(224, 224)):
    """
    Resize and scale the PIL image to a numpy array shaped (1, H, W, 3)
    and scaled the same way as during training (1./255).
    """
    img = pil_img.resize(target_size, Image.BILINEAR)
    arr = np.asarray(img).astype("float32") / 255.0
    if arr.ndim == 2:  # grayscale -> to RGB
        arr = np.stack([arr]*3, axis=-1)
    # ensure shape
    arr = arr.reshape((1, target_size[0], target_size[1], 3))
    return arr
